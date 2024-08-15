const { Permiso } = require("../models");

exports.getAllPermisos = async () => {
    return await Permiso.findAll();
};

exports.getPermisoById = async (id) => {
    return await Permiso.findByPk(id);
}

exports.createPermiso = async (permiso) => {
    return await Permiso.create(permiso);
}

exports.updatePermiso = async (id, permiso) => {
    return await Permiso.update(permiso, { where: { id } });
}

exports.statusPermiso = async (id) => {
    return await Permiso.update({ estado: false }, { where: { id } });
}
exports.deletePermiso = async (id) => {
    return await Permiso.destroy( { where: { id } });
}
