const { Cita } = require("../models");

exports.getAllCitas = async () => {
    return await Cita.findAll();
};

exports.getCitaById = async (id) => {
    return await Cita.findByPk(id);
}

exports.createCita = async (cita) => {
    return await Cita.create(cita);
}

exports.updateCita = async (id, cita) => {
    return await Cita.update(cita, { where: { id } });
}

exports.statusCita = async (id) => {
    return await Cita.update({ estado: false }, { where: { id } });
}
exports.deleteCita = async (id) => {
    return await Cita.destroy( { where: { id } });
}
