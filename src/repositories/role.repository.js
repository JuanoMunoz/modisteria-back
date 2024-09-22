const { Role, RolesPermisos } = require("../models");

exports.getAllRoles = async () => {
    return await Role.findAll();
};

exports.getRoleById = async (id) => {
    return await Role.findOne({ 
        where: { id },
        include: [ { model: RolesPermisos, as: "roles_permisos"} ], 
        //raw: true Devuelve el objeto literal desde la bd
    });
}

exports.createRole = async (nombre, permisosId) => {
    return await Role.create({nombre, permisosId});
}

exports.updateRole = async (id, nombre, permisosId) => {
    return await Role.update({nombre, permisosId}, { where: { id } });
}

exports.statusRole = async (id) => {
    return await Role.update({ estado: false }, { where: { id } });
}
exports.deleteRole = async (id) => {
    return await Role.destroy( { where: { id } });
}
