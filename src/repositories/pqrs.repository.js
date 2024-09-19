const { PQRS } = require("../models");

exports.getAllPQRS = async () => {
    return await PQRS.findAll();
};

exports.getPQRSById = async (id) => {
    return await PQRS.findByPk(id);
}

exports.createPQRS = async (pqrs) => {
    return await PQRS.create(pqrs);
}

exports.updatePQRS = async (id, pqrs) => {
    return await PQRS.update(pqrs, { where: { id } });
}

exports.statusPQRS = async (id) => {
    return await PQRS.update({ estado: false }, { where: { id } });
}

exports.deletePQRS = async (id) => {
    return await PQRS.destroy({ where: { id } });
}
