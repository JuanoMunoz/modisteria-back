const { Catalogo, Categoria } = require("../models");
const { Op } = require("sequelize");

exports.getAllCatalogo = async (offset, limit, priceLimit, category) => {
    const whereClause = {
        precio: { [Op.lte]: priceLimit }
    }
    if (category) {
        whereClause.categoriaId = category
    }
    return await Catalogo.findAndCountAll({
        offset,
        limit,
        order: [["id", "DESC"]],
        where: whereClause
    });
};

exports.getCatalogoById = async (id) => {
    return await Catalogo.findByPk(id);
}

exports.createCatalogo = async (catalogo) => {
    return await Catalogo.create(catalogo);
}

exports.updateCatalogo = async (id, catalogo) => {
    return await Catalogo.update(catalogo, { where: { id: id } });
}

exports.statusCatalogo = async (id) => {
    return await Catalogo.update({ estado: false }, { where: { id } });
}
exports.deleteCatalogo = async (id) => {
    return await Catalogo.destroy({ where: { id } });
}

exports.getCatalogoByCategoria = async(categoriaId)=>{
    return await Catalogo.findAll({
        where:{categoriaId},
        include:[{model: Categoria, as: "categorias", attributes:['nombre']}]
    })
}