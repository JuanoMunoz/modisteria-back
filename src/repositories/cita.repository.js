const { Cita, Usuario, Estado } = require("../models");
const { Op } = require("sequelize");

exports.getAllCitas = async (estadoId) => {
  const whereClause = {};
  if (estadoId) {
    whereClause.estadoId = parseInt(estadoId);
  }
  return await Cita.findAll({ where: whereClause });
};

exports.getCitaById = async (id) => {
  return await Cita.findByPk(id);
};

exports.getCitasByUserId = async (usuarioId, estadoId) => {
  const whereClause = {
    usuarioId,
  };
  if (estadoId) {
    whereClause.estadoId = parseInt(estadoId);
  }
  return await Cita.findAll({
    where: whereClause,
  });
};

exports.createCita = async (cita) => {
  return await Cita.create(cita);
};

exports.updateCita = async (id, cita) => {
  return await Cita.update(cita, { where: { id } });
};

exports.statusCita = async (id) => {
  return await Cita.update({ estado: false }, { where: { id } });
};

exports.deleteCita = async (id) => {
  const cita = await Cita.findByPk(id);

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

    // const existeUsuario = await Usuario.findOne({ where: { id: cita.usuarioId } }); 
    // const existeEstado = await Estado.findOne({ where: { id: cita.estadoId } });

    // if (existeUsuario || existeEstado) {
    //     throw new Error("No se puede eliminar la cita porque está asociada a registros en otras tablas");
    // }

  return await Cita.destroy({ where: { id } });
};

exports.getCitaByUAS = async (usuarioId, estadoId) => {
  return await Cita.findOne({
    where: {
      usuarioId: usuarioId,
      estadoId: { [Op.ne]: estadoId }, // Busca citas que NO tengan estado 13 (Terminada)
    },
  });
};
