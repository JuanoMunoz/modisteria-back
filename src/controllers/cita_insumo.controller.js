const { statusCita, getCitaById } = require("../repositories/cita.repository");
const { updateVentaAC } = require("../repositories/venta.repository");
const { createCitaInsumo, getInsumoStock, discountInsumo } = require('../repositories/cita_insumo.repository');


exports.createAndDiscount = async (req, res) => {
  const { citaId, datosInsumos } = req.body;
  try {
    for (const dataInsumos of datosInsumos) {
      const { insumo_id, cantidad_utilizada } = dataInsumos;
      const insumoStock = await getInsumoStock(insumo_id);
      if (insumoStock < cantidad_utilizada) {
        return res.status(400).json({
          msg: `No hay suficiente stock para el insumo con ID ${insumo_id}. Disponible: ${insumoStock}, Requerido: ${cantidad_utilizada}.`,
        });
      }

      const newCitaInsumos = {
        cita_id: citaId,
        insumo_id: insumo_id,
        cantidad_utilizada: cantidad_utilizada,
      };
      await createCitaInsumo(newCitaInsumos);
      await discountInsumo(insumo_id, cantidad_utilizada);
    }

    // Responder después de procesar todos los insumos correctamente
    res.status(201).json({ msg: "Insumos descontados exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};



exports.endCitaCreateVenta = async (req, res) => {
  const { citaId } = req.body;
  try {
    const cita = await getCitaById(citaId);

    await statusCita(citaId, 13);

    const ventaActualizada = await updateVentaAC(citaId, {
      valorFinal: cita.precio,
      estadoId: 14,
    });

    //AGREGAR AL HISTORIAL INSUMO

    res.status(201).json({ msg: "Cita terminada y venta completada" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
