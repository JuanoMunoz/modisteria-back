const { Role, RolesPermisos, Permiso, Estado } = require("../models");

exports.getAllRoles = async () => {
    return await Role.findAll();
};

exports.getRoleById = async (id) => {
    return await Role.findOne({ 
        where: { id }
        // include: [ { model: RolesPermisos, as: "roles_permisos"} ], 
        //raw: true Devuelve el objeto literal desde la bd
    });
}

exports.createRole = async (role) => {
    return await Role.create(role);
}

exports.updateRole = async (id, nombre, permisosId, estadoId) => {
    return await Role.update({nombre, permisosId, estadoId}, { where: { id } });
}

exports.statusRole = async (id) => {
    return await Role.update({ estado: false }, { where: { id } });
}

exports.deleteRole = async (id) => {
    const role = await Role.findOne({
        where: { id }
    });
    
    if (!role) {
        throw new Error("Rol no encontrado");
    }

    const existePermiso = role.permisosId && role.permisosId.length > 0;
    const existeEstado = await Estado.findOne({ where: { id: role.estadoId } });
    
    if (existePermiso || existeEstado) {
        throw new Error("No se puede eliminar el rol porque está asociado a registros en otras tablas");
    }
    
    return await Role.destroy({ where: { id } });
};
