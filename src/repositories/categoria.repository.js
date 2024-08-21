const { Categoria } = require("../models");

exports.getAllCategorias = async () => {
    return await Categoria.findAll();
};

exports.getCategoriaById = async (id) => {
    return await Categoria.findByPk(id);
}

exports.createCategoria = async (categoria) => {
    return await Categoria.create(categoria);
}

exports.updateCategoria = async (id, categoria) => {
    return await Categoria.update(categoria, { where: { id } });
}

exports.statusCategoria = async (id) => {
    return await Categoria.update({ estado: false }, { where: { id } });
}
exports.deleteCategoria = async (id) => {
    return await Categoria.destroy( { where: { id } });
}
exports.getCategoriaByTipo = async(tipo)=>{
    return await Categoria.findAll({where:{tipo}})
}