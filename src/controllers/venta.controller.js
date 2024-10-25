const { Pedido } = require("../models");
const { createDomicilioVenta } = require("../repositories/domicilio.repository");
const {
  getPedidoByUsuarioyEstado,
  getPedidoByVenta,
} = require("../repositories/pedido.repository");
const {
  getAllVentas,
  getVentaById,
  createVenta,
  getVentaByUsuarioId,
  updateVenta,
} = require("../repositories/venta.repository");

exports.getAllVentas = async (req, res) => {
  try {
    const ventas = await getAllVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getVentaById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(id);
    const venta = await getVentaById(id);
    res.status(200).json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVentaByUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(id);
    const venta = await getVentaByUsuarioId(id);
    res.status(200).json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createVenta = async (req, res) => {
  const { metodoPago, valorDomicilio, nombrePersona } = req.body;

  try {
    console.log("Iniciando proceso de creación de venta...");

    let imagen;
    try {
      imagen = await gestionImagen(req, metodoPago);
      console.log("Imagen gestionada:", imagen);
    } catch (error) {
      console.error("Error gestionando imagen:", error);
      return res.status(400).json({ msg: "Error gestionando la imagen" });
    }

    const newVenta = {
      fecha: new Date(),
      imagen: imagen,
      nombrePersona: metodoPago === 'transferencia' ? nombrePersona : null,
      valorDomicilio: Number(valorDomicilio) || 0,
      valorPrendas: 0,
      valorFinal: 0,
      metodoPago,
      estadoId: 3,
    };

    const venta = await createVenta(newVenta);
    console.log("Venta creada:", venta);

    const usuario = req.id;
    const pedidos = await getPedidoByUsuarioyEstado(usuario);
    
    if (!pedidos || pedidos.length === 0) {
      return res.status(400).json({ msg: "No hay pedidos disponibles para el usuario" });
    }

    console.log("Pedidos obtenidos:", pedidos);

    let total = 0;

    try {
      const proceso = await Promise.all(
        pedidos.map(async (producto) => {
          try {
            const pedidoActualizado = await Pedido.update(
              { ventaId: venta.id },
              { where: { id: producto.id } }
            );
            total += producto.valorUnitario * producto.cantidad;
            return pedidoActualizado;
          } catch (error) {
            throw new Error("Error actualizando pedidos: " + error.message);
          }
        })
      );
      console.log("Pedidos actualizados:", proceso);
    } catch (error) {
      console.error("Error en el proceso de actualización de pedidos:", error);
      return res.status(500).json({ msg: "Error actualizando los pedidos" });
    }

    const cambio = {
      valorPrendas: total,
      valorDomicilio: Number(valorDomicilio) || 0,
      valorFinal: total + (Number(valorDomicilio) || 0),
    };

    const ventaActualizada = await updateVenta(venta.id, cambio);
    console.log("Venta actualizada:", ventaActualizada);

    if (valorDomicilio > 0) {
      try {
        const crearDomicilio = await createDomicilioVenta(venta.id);
        console.log("Domicilio creado:", crearDomicilio);
      } catch (error) {
        console.error("Error creando domicilio:", error);
        return res.status(500).json({ msg: "Error al crear el domicilio" });
      }
    }

    res.status(201).json({ msg: "Venta creada y actualizada exitosamente" });
  } catch (error) {
    console.log("Error en el proceso:", error);
    res.status(500).json({ error: "Error al crear la venta" });
  }
};

async function gestionImagen(req, metodoPago) {
  let imagen = null;

  if (metodoPago === "efectivo") {
    imagen = null;
  } else if (metodoPago === "transferencia") {
    if (!req.file) {
      throw new Error(
        "Se requiere una imagen para el método de pago transferencia"
      );
    }
    const processedBuffer = await helperImg(req.file.buffer, 300);
    const result = await uploadToCloudinary(processedBuffer);
    imagen = result.url;
  }
  return imagen;
}

exports.confirmarVenta = async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await getVentaById(id);
    if (!venta) {
      return res.status(404).json({ msg: "Venta no encontrada" });
    }

    const pedidos = await getPedidoByVenta(id);
    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ msg: "No hay pedidos asociados a esta venta" });
    }

    // Actualizar el estado de cada pedido
    await Promise.all(
      pedidos.map(async (producto) => {
        await Pedido.update(
          { estadoId: 14 }, // Estado Pagado
          { where: { id: producto.id } }
        );
      })
    );

    const cambio = { estadoId: 14 }; // Estado Pagado
    await updateVenta(id, cambio);

    res
      .status(200)
      .json({ msg: "Venta confirmada y pedidos actualizados exitosamente" });
  } catch (error) {
    console.error("Error al confirmar la venta:", error);
    res.status(500).json({ msg: "Error al confirmar la venta", error });
  }
};
