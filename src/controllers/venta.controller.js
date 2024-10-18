const { Pedido } = require("../models");
const { getPedidoByUsuarioyEstado, getPedidoByVenta, updatePedido } = require("../repositories/pedido.repository");
const { getAllVentas, getVentaById, createVenta, getVentaByUsuarioId, updateVenta } = require("../repositories/venta.repository");

exports.getAllVentas = async (req, res) => {
    try {
        const ventas = await getAllVentas();
        res.status(200).json(ventas);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.getVentaById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const venta = await getVentaById(id);
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getVentaByUsuarioId = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const venta = await getVentaByUsuarioId(id);
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createVenta = async (req, res) => {
    const { metodoPago } = req.body;

    try {
        console.log("Inicio del proceso de creación de venta...");

        const imagen = await gestionImagen(req, metodoPago);
        console.log("Imagen gestionada:", imagen);

        const newVenta = {
            fecha: new Date(),
            imagen: imagen,
            nombrePersona: null,
            valorDomicilio: 0,
            valorPrendas: 0,
            valorFinal: 0,
            metodoPago,
            estadoId: 3
        };
        const venta = await createVenta(newVenta);
        console.log("Venta creada:", venta);

        const usuario = req.id;
        const pedidos = await getPedidoByUsuarioyEstado(usuario);
        console.log("Pedidos obtenidos:", pedidos);

        let total = 0;
        const proceso = await Promise.all(pedidos.map(async (producto) => {
            try {
                const pedidoActualizado = await Pedido.update(
                    { ventaId: venta.id },
                    { where: { id: producto.id } }
                );
                total += (producto.valorUnitario * producto.cantidad);
            } catch (error) {
                console.error(`Error actualizando pedido ${producto.id}:`, error);
            }
        }));

        const valorDomicilio = 0;
        const cambio = {
            valorPrendas: total,
            valorDomicilio: valorDomicilio,
            valorFinal: total + valorDomicilio
        };
        const ventaActualizada = await updateVenta(venta.id, cambio);
        console.log("Venta actualizada:", ventaActualizada);

        res.status(201).json({ msg: 'Venta creada y actualizada exitosamente' });
    } catch (error) {
        console.log("Error en el proceso:", error);
        res.status(500).json({ error: "Error al crear la venta" });
    }
};

async function gestionImagen(req, metodoPago) {
    let imagen = null;

    if (metodoPago === 'efectivo') {
        imagen = null;
    } else if (metodoPago === 'transferencia') {
        if (!req.file) {
            throw new Error('Se requiere una imagen para el método de pago transferencia');
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
        // Verificar si la venta existe
        const venta = await getVentaById(id);
        if (!venta) {
            return res.status(404).json({ msg: 'Venta no encontrada' });
        }

        // Obtener los pedidos asociados a la venta
        const pedidos = await getPedidoByVenta(id);
        if (pedidos.length === 0) {
            return res.status(404).json({ msg: 'No hay pedidos asociados a esta venta' });
        }

        // Actualizar el estado de cada pedido
        await Promise.all(pedidos.map(async (producto) => {
            await Pedido.update(
                { estadoId: 14 }, // Estado Pagado
                { where: { id: producto.id } }
            );
        }));

        // Actualizar el estado de la venta a pagada
        const cambio = { estadoId: 14 }; // Estado Pagado
        await updateVenta(id, cambio);

        // Responder con éxito
        res.status(200).json({ msg: 'Venta confirmada y pedidos actualizados exitosamente' });
    } catch (error) {
        console.error('Error al confirmar la venta:', error);
        res.status(500).json({ msg: 'Error al confirmar la venta', error });
    }
};

