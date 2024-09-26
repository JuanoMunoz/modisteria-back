const {Cita, Insumo, CitaInsumo} = require('../models');
const {getAllCitaInsumoByCitaID} =require('../repositories/cita_insumo.repository')
const {getAllCatInsByCatalogoID} =require('../repositories/catalogo_insumos.repository')
const {getCitaById} =require('../repositories/cita.repository')
const {getCatalogoById} =require('../repositories/catalogo.repository')


//Ficha tecnica de cita
exports.ftCita = async(req,res)=>{
    const {citaId} = req.body
    const citas = await getAllCitaInsumoByCitaID(citaId)
    const cita = await getCitaById(citaId)
    const fichaTecnica = {
        citaId: cita.id,
        fecha:cita.fecha,
        precio: cita.precio, 
        insumos: citas.map(ci => ({
            insumoId: ci.insumo_id,
            cantidadUtilizada: ci.cantidad_utilizada
        }))
    };
    res.status(201).json(fichaTecnica)
}

/* exports.ftCatalogo = async(req, res) =>{
    const {catalogoId} = req.body
    const catalogos = await getAllCatInsByCatalogoID(catalogoId)
    const catalogo = await getCatalogoById(catalogoId)
    const fichaTecnica={
        catalogoId:catalogo.id,
        precio:catalogo.precio,
        insumos:catalogos.map(ca=>({
            insumoId:ca.insumo_id,
            cantidadUtilizada:ca.cantidadUtilizada
        }))
    }

} */