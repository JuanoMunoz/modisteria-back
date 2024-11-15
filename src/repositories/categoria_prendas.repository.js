const { Insumo, Catalogo, CategoriaPrendas } = require("../models");

exports.getAllCategoriaPrendas = async (type) => {
  const whereClause = {};
  if (type) {
    whereClause.tipo = type;
  }
  return await CategoriaPrendas.findAll({ where: whereClause });
};

exports.getCategoriaPrendaById = async (id) => {
  return await CategoriaPrendas.findByPk(id);
};

exports.createCategoriaPrenda = async (categoria) => {
  return await CategoriaPrendas.create(categoria);
};

exports.updateCategoriaPrenda = async (id, categoria) => {
  return await CategoriaPrendas.update(categoria, { where: { id } });
};

exports.statusCategoriaPrenda = async (id) => {
  return await CategoriaPrendas.update({ estado: false }, { where: { id } });
};

exports.deleteCategoriaPrenda = async (id) => {
  const categoria = await CategoriaPrendas.findByPk(id);

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
    return await CategoriaPrendas.destroy({ where: { id } });
  } else {
    throw new Error("No se puede eliminar la categoría porque está activa");
  }
};
