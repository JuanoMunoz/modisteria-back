const { createCitaInsumo, discountInsumo} = require('../repositories/cita_insumo.repository');
const {getInsumoById} = require('../repositories/insumo.repository')

exports.createAndDiscount = async (req, res)=>{
    const {citaId, insumoId, cantidad_utilizada} = req.body
    try {
        const insumo = await getInsumoById(insumoId)
        if (insumo.cantidad < cantidad_utilizada) {
            res.status(500).json({msg:"La cantidad de insumos necesarios insuficiente."})
        }
        const newCitaI = {
            cita_id: citaId,
            insumo_id: insumoId,
            cantidad_utilizada
        }
        console.log(newCitaI)
        await createCitaInsumo(newCitaI);
        await discountInsumo(insumoId, cantidad_utilizada)

        res.status(201).json({msg:"Insumos registrados y descontados exitosamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}