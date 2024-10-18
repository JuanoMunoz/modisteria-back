const { Catalogo, CatalogoInsumos, Insumo } = require("../models");
const { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo, getInsumosByCategoria, reponerInsumo } = require("../repositories/insumo.repository");

exports.getAllInsumos = async (req, res) => {
  try {
    const insumos = await getAllInsumos();
    res.status(200).json(insumos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getInsumosByCategoria = async (req, res) => {
    const { categoriaId } = req.params;
    try {
        const insumos = await getInsumosByCategoria(categoriaId);
        if (insumos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron insumos para esta categoría' });
        }
        res.status(200).json(insumos);
    } catch (error) {
        console.error('Error al obtener insumos:', error); 
        res.status(500).json({ error: 'Error al obtener los insumos', details: error.message });
    }
};

exports.reponerInsumo = async(req,res)=>{
    const {id} = req.body;
    try {
        await reponerInsumo(id)
        res.status(201).json({msg:"Reposición de insumos realizada."})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

exports.getInsumoById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const insumo = await getInsumoById(id);
        res.status(200).json(insumo);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createInsumo = async (req, res) => {
    const insumo = req.body;

    try {
        console.log(req.body);
        await createInsumo(insumo);
        res.status(201).json({msg: 'insumo creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateInsumo = async (req, res) => {
    const { id } = req.params;
    const insumo = req.body;

    try {
        await updateInsumo(id, insumo);

        //Actualización del stock en catálogo
        const catalogoInsumos = await CatalogoInsumos.findAll({
            where: { insumo_id: id }
        });

        const catalogoIds = catalogoInsumos.map(item => item.catalogo_id);
        
        const catalogos = await Catalogo.findAll({
            where: {
                id: catalogoIds
            }
        });

        for (const catalogo of catalogos) {
            const newStock = await calculateStockForCatalogo(catalogo.id);
            catalogo.stock = newStock;
            await catalogo.save();
        }

        res.status(200).json({ msg: 'Insumo actualizado y stock recalculado exitosamente' });
    } catch (error) {
        console.error(`Error en updateInsumo: ${error.message}`);
        res.status(500).json({ error: 'Error al actualizar el insumo' });
    }
};

const calculateStockForCatalogo = async (catalogoId) => {
    const catalogoInsumos = await CatalogoInsumos.findAll({
        where: { catalogo_id: catalogoId }
    });

    let stock = null;

    for (const item of catalogoInsumos) {
        const insumo = await Insumo.findByPk(item.insumo_id);
        if (insumo) {
            const cantidadUtilizada = item.cantidad_utilizada;
            const cantidadDisponible = insumo.cantidad;

            if (cantidadUtilizada > 0) {
                const stockPorInsumo = Math.floor(cantidadDisponible / cantidadUtilizada);

                if (stock === null || stockPorInsumo < stock) {
                    stock = stockPorInsumo;
                }
            }
        }
    }

    if (stock === null) {
        stock = 0;
    }

    return stock;
};


exports.statusInsumo = async (req, res) => {
    const { id } = req.params;

    try {
        await statusInsumo(id);
        res.status(201).json({msg: 'insumo inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteInsumo = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteInsumo(id);
        res.status(201).json({msg: 'insumo eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}