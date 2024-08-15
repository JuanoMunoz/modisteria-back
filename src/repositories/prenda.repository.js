const { Prenda } = require("../models");

exports.getAllPrendas = async () => {
    return await Prenda.findAll();
};

exports.getPrendaById = async (id) => {
    return await Prenda.findByPk(id);
}

exports.createPrenda = async (prenda) => {
    return await Prenda.create(prenda);
}

exports.updatePrenda = async (id, prenda) => {
    return await Prenda.update(prenda, { where: { id } });
}

exports.statusPrenda = async (id) => {
    return await Prenda.update({ estado: false }, { where: { id } });
}
exports.deletePrenda = async (id) => {
    return await Prenda.destroy( { where: { id } });
}
