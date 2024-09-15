const { Catalogo, Categoria } = require("../models");
const { Op } = require("sequelize");

exports.getAllCatalogo = async (offset, limit, priceLimit) => {
    console.log(offset,limit);
    
    return await Catalogo.findAndCountAll({
        offset,
        limit,
        order: [["id", "DESC"]],
        where: {
            precio:  { [Op.lte]: priceLimit }
        }
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