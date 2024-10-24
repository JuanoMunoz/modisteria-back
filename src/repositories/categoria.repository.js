const { Categoria, Insumo, Catalogo } = require("../models");

exports.getAllCategorias = async (type) => {
  const whereClause = {};
  if (type) {
    whereClause.tipo = type;
  }
  return await Categoria.findAll({ where: whereClause });
};

exports.getCategoriaById = async (id) => {
  return await Categoria.findByPk(id);
};

exports.getCategoriaByTipo = async (tipo) => {
  return await Categoria.findAll({ where: { tipo } });
};

exports.createCategoria = async (categoria) => {
  return await Categoria.create(categoria);
};

exports.updateCategoria = async (id, categoria) => {
  return await Categoria.update(categoria, { where: { id } });
};

exports.statusCategoria = async (id) => {
  return await Categoria.update({ estado: false }, { where: { id } });
};

exports.deleteCategoria = async (id) => {
  const categoria = await Categoria.findByPk(id);

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
    return await Categoria.destroy({ where: { id } });
  } else {
    throw new Error("No se puede eliminar la categoría porque está activa");
  }
};
