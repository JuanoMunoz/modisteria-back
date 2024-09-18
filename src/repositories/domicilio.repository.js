const { Domicilio, Usuario, Role } = require("../models");

exports.getAllDomicilios = async () => {
    return await Domicilio.findAll();
};

exports.getDomicilioById = async (id) => {
    return await Domicilio.findByPk(id);
}

exports.createDomicilio = async (domicilio, usuarioId) => {
    console.log(usuarioId); 
    const user = await Usuario.findByPk(usuarioId);

    if (user) {
        const rol = await Role.findByPk(user.roleId);
        
        if (rol && rol.nombre === 'Domiciliario') {
            return await Domicilio.create(domicilio);
        } else {
            const domiciliarios = await Usuario.findAll({
                include: {
                    model: Role,
                    where: { nombre: 'Domiciliario' }
                }
            });
            
            if (domiciliarios.length === 0) {
                throw new Error('No hay domiciliarios disponibles.');
            } else {
                throw new Error('Solo un usuario con rol domiciliario puede crear un domicilio.');
            }
        }
    } else {
        throw new Error('Usuario no encontrado.');
    }
};

exports.updateDomicilio = async (id, domicilio) => {
    return await Domicilio.update(domicilio, { where: { id } });
}

exports.statusDomicilio = async (id) => {
    return await Domicilio.update({ estado: false }, { where: { id } });
}
exports.deleteDomicilio = async (id) => {
    return await Domicilio.destroy({ where: { id } });
}

//Poner que solo se pueda el usuario de domiciliario y si no hay registros con ese rol que aparezca que no hay domiciliarios disponibles o algo asi
