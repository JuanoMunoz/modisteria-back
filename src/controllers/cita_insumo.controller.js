const {getAllCitaInsumo, getCitaInsumoById, createCitaInsumo, updateCitaInsumo, deleteCitaInsumo, statusCitaInsumo} = require('../repositories/cita_insumo.repository');

exports.createAndDiscount = async (req, res)=>{
    const {citaId, insumoId, cantidad_utilizada} = req.body
    try {
        const newCitaI = {
            citaId,
            insumoId,
            cantidad_utilizada
        }
        await createCitaInsumo(newCitaI);
        await this.createAndDiscount(insumoId, cantidad_utilizada)
        res.status(201).json({msg:"Insumos registrados y descontados exitosamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}