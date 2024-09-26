const { PQRS, Usuario, Domicilio } = require("../models");

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
    const pqrs = await PQRS.findByPk(id);
    
    if (!pqrs) {
        throw new Error("PQRS no encontrado");
    }

    // const existeDomicilio = await Domicilio.findOne({ where: { id: pqrs.domicilioId } }); 
    // const existeUsuario = await Usuario.findOne({ where: { id: pqrs.usuarioId } });
    
    // if (existeDomicilio || existeUsuario) {
    //     throw new Error("No se puede eliminar la PQRS porque está asociado a otros registros");
    // }

    return await PQRS.destroy({ where: { id } });
}
