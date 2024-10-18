const { Insumo, Categoria } = require("../models");

exports.getAllInsumos = async () => {
    return await Insumo.findAll();
};

exports.getInsumoById = async (id) => {
    return await Insumo.findByPk(id);
}

exports.createInsumo = async (insumo) => {
    return await Insumo.create(insumo);
}

exports.reponerInsumo = async(id)=>{
    return await Insumo.update({cantidad:0},{where:{id}})
}

exports.updateInsumo = async (id, insumo) => {
    return await Insumo.update(insumo, { where: { id } });
}

exports.statusInsumo = async (id) => {
    return await Insumo.update({ estado: false }, { where: { id } });
}

exports.deleteInsumo = async (id) => {
    const insumo = await Insumo.findByPk(id);
    
    if (!insumo) {
        throw new Error("Insumo no encontrado");
    }

    // const existeCategoria = await Categoria.findOne({ where: { id: insumo.categoriaId } }); 
    
    // if (existeCategoria) {
    //     throw new Error("No se puede eliminar el insumo porque está asociado a registros en otras tablas");
    // }

    // if (insumo.estadoId === 2) {
        return await Insumo.destroy( { where: { id } });
    // }
    // else {
    //     throw new Error("No se puede eliminar el insumo porque está activo");
    // }
}

exports.getInsumosByCategoria = async(categoriaId)=>{
    return await Insumo.findAll({
        where:{categoriaId},
        include:[{model: Categoria, as: "categorias", attributes:['nombre']}]
    })
}

