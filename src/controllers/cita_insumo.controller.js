const { createCitaInsumo, discountInsumo} = require('../repositories/cita_insumo.repository');
const {statusCita} = require('../repositories/cita.repository')
const {getInsumoById} = require('../repositories/insumo.repository')

exports.createAndDiscount = async (req, res) => {
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
        res.status(500).json(error);
    }
};


