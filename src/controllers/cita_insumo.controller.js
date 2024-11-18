const {
  createCitaInsumo,
  discountInsumo,
} = require("../repositories/cita_insumo.repository");
const { statusCita, getCitaById } = require("../repositories/cita.repository");
const { getInsumoById } = require("../repositories/insumo.repository");
const { updateVentaAC } = require("../repositories/venta.repository");

/* exports.createAndDiscount = async (req, res) => {
    const { citaId, datosInsumos } = req.body; 
    try {
        await statusCita(citaId, 13)
        for (const insumoData of datosInsumos) {
            const { insumoId, cantidad_utilizada } = insumoData;
            const newCitaI = {
                cita_id: citaId,
                insumo_id: insumoId,
                cantidad_utilizada: cantidad_utilizada
            };
            console.log(newCitaI);
            await createCitaInsumo(newCitaI);
            await discountInsumo(insumoId, cantidad_utilizada);
        }
        res.status(201).json({ msg: "Insumos descontados exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}; */

//FINALIZAR CITA Y CREAR VENTA

//CONTAR CON LOS INSUMOS ANTES

exports.createAndDiscount = async (req, res) => {
  const { citaId, datosInsumos } = req.body;
  try {
    await statusCita(citaId, 13);
    for (const insumoData of datosInsumos) {
      const { insumoId, cantidad_utilizada } = insumoData;
      const newCitaI = {
        cita_id: citaId,
        insumo_id: insumoId,
        cantidad_utilizada: cantidad_utilizada,
      };
      console.log(newCitaI);
      await createCitaInsumo(newCitaI);
      await discountInsumo(insumoId, cantidad_utilizada);
    }
    res.status(201).json({ msg: "Insumos descontados exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.endCitaCreateVenta = async (req, res) => {
  const { citaId } = req.body;
console.log(citaId);
  try {
    const cita = await getCitaById(citaId);

    await statusCita(citaId, 13);

    const ventaActualizada = await updateVentaAC(citaId, {
      valorFinal: cita.precio, 
      estadoId: 14, 
    });

    res.status(201).json({ msg: "Cita terminada y venta completada" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
