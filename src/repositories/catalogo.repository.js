const { Catalogo, Categoria, Talla, Insumo, Imagen } = require("../models");
const { Op } = require("sequelize");

exports.getAllCatalogo = async (offset, limit, priceLimit, category) => {
  const whereClause = {
    precio: { [Op.lte]: priceLimit },
  };
  if (category) {
    whereClause.categoriaId = category;
  }
  return await Catalogo.findAndCountAll({
    offset,
    limit,
    order: [["id", "DESC"]],
    where: whereClause,
    include: [
      { model: Talla },
      { model: Insumo, as: "insumos" },
      { model: Imagen },
    ],
  });
};

exports.getCatalogoById = async (id) => {
  return await Catalogo.findByPk(id);
};

exports.createCatalogo = async (catalogo) => {
  return await Catalogo.create(catalogo);
};

exports.updateCatalogo = async (id, catalogo) => {
  return await Catalogo.update(catalogo, { where: { id }, returning: true });
};

exports.statusCatalogo = async (id) => {
  return await Catalogo.update({ estado: false }, { where: { id } });
};
exports.deleteCatalogo = async (id) => {
  const catalogo = await Catalogo.findOne({ where: { idPedido: id } });

  if (!catalogo) {
    throw new Error("Catálogo no encontrado");
  }

  // const existeCategoria = await Categoria.findOne({ where: { id: catalogo.categoriaId } });
  // const existeEstado = await Estado.findOne({ where: { id: cita.estadoId } });

  // if (existeCategoria || existeEstado) {
  //     throw new Error("No se puede eliminar el catálogo porque está asociado a registros en otras tablas");
  // }

  return await Catalogo.destroy({ where: { id } });
};

exports.getCatalogoByCategoria = async (categoriaId) => {
  return await Catalogo.findAll({
    where: { categoriaId },
    include: [{ model: Categoria, as: "categorias", attributes: ["nombre"] }],
  });
};
