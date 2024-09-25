const { Domicilio, Usuario, Role } = require("../models");

exports.getAllDomicilios = async () => {
    return await Domicilio.findAll();
};

exports.getDomicilioById = async (id) => {
    return await Domicilio.findByPk(id);
};

exports.getDomiciliosByDomiciliario = async (usuarioId) => {
    return await Domicilio.findAll({where: {
      usuarioId: usuarioId 
    }});
};

// exports.getDomiciliosByCliente = async (usuarioId) => {
//     return await Domicilio.findAll({where: {
//       usuarioId: usuarioId 
//     }});
// };

exports.createDomicilio = async (domicilio) => {
    const user = await Usuario.findByPk(domicilio.usuarioId);
    
    if (user) {
      const rol = await Role.findByPk(user.roleId);
  
      if (rol && rol.nombre === 'DOMICILIARIO') {
        // El usuario tiene el rol 'Domiciliario', se puede crear el domicilio
        return await Domicilio.create(domicilio);
      } else {
        // Si el usuario no tiene el rol 'Domiciliario', lanzamos un error
        const domiciliarios = await Usuario.findAll({
          include: { model: Role, where: { nombre: 'DOMICILIARIO' } }
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
