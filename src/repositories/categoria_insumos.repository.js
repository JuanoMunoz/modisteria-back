const { Insumo, Catalogo, CategoriaInsumos } = require("../models");

exports.getAllCategoriaInsumos = async (type) => {
  const whereClause = {};
  if (type) {
    whereClause.tipo = type;
  }
  return await CategoriaInsumos.findAll({ where: whereClause });
};

exports.getCategoriaInsumoById = async (id) => {
  return await CategoriaInsumos.findByPk(id);
};

exports.getCategoriaInsumoByTipo = async (tipo) => {
  return await CategoriaInsumos.findAll({ where: { tipo } });
};

exports.createCategoriaInsumo = async (categoria) => {
  return await CategoriaInsumos.create(categoria);
};

exports.updateCategoriaInsumo = async (id, categoria) => {
  return await CategoriaInsumos.update(categoria, { where: { id } });
};

exports.statusCategoriaInsumo = async (id) => {
  return await CategoriaInsumos.update({ estado: false }, { where: { id } });
};

exports.deleteCategoriaInsumo = async (id) => {
  const categoria = await CategoriaInsumos.findByPk(id);

  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }
  const isCategoriaBeingUsedOnInsumos = await Insumo.findOne({
    where: { categoriaId: id },
  });
  const isCategoriaBeingUsedOnCatalogo = await Catalogo.findOne({
    where: { categoriaId: id },
  });
  if (isCategoriaBeingUsedOnInsumos) {
    throw new Error(
      "¡No se puede eliminar la categoría porque está asociada a un insumo!"
    );
  }

  if (isCategoriaBeingUsedOnCatalogo) {
    throw new Error(
      "¡No se puede eliminar la categoría porque está asociada a una prenda del catálogo!"
    );
  }
  if (categoria.estadoId === 2) {
    return await CategoriaInsumos.destroy({ where: { id } });
  } else {
    throw new Error("No se puede eliminar la categoría porque está activa");
  }
};
