const { Insumo } = require("../models");

exports.getAllInsumos = async () => {
    return await Insumo.findAll();
};

exports.getInsumoById = async (id) => {
    return await Insumo.findByPk(id);
}

exports.createInsumo = async (insumo) => {
    return await Insumo.create(insumo);
}

exports.updateInsumo = async (id, insumo) => {
    return await Insumo.update(insumo, { where: { id } });
}

exports.statusInsumo = async (id) => {
    return await Insumo.update({ estado: false }, { where: { id } });
}
exports.deleteInsumo = async (id) => {
    return await Insumo.destroy({ where: { id } });
}
