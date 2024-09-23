const { Estado } = require("../models");

exports.getAllEstados = async () => {
    return await Estado.findAll();
};

exports.getEstadoById = async (id) => {
    return await Estado.findByPk(id);
}

exports.createEstado = async (estado) => {
    return await Estado.create(estado);
}

exports.updateEstado = async (id, estado) => {
    return await Estado.update(estado, { where: { id } });
}

exports.statusEstado = async (id) => {
    return await Estado.update({ estado: false }, { where: { id } });
}
exports.deleteEstado = async (id) => {
    return await Estado.destroy({ where: { id } });
}


