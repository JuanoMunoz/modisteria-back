const {createCatIns} = require('../repositories/catalogo_insumos.repository.js')

exports.createCatalogoInsumos = async(req, res)=>{
    const {catalogoId, datosInsumos} = req.body;
    try {
        for (const dataInsumos of datosInsumos){
            const {insumoId, cantidad_utilizada} = dataInsumos;
            const newCatIns = {
                catalogo_id:catalogoId,
                insumo_id:insumoId,
                cantidad_utilizada:cantidad_utilizada
            }
            
            await createCatIns(newCatIns);
        }
        res.status(201).json({msg:"Registros creados en catalogo insumos"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}