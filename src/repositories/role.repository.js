const { Role } = require("../models");

exports.getAllRoles = async () => {
    return await Role.findAll();
};

exports.getRoleById = async (id) => {
    return await Role.findByPk(id);
}

exports.createRole = async (role) => {
    return await Role.create(role);
}

exports.updateRole = async (id, role) => {
    return await Role.update(role, { where: { id } });
}

exports.statusRole = async (id) => {
    return await Role.update({ estado: false }, { where: { id } });
}
exports.deleteRole = async (id) => {
    return await Role.destroy( { where: { id } });
}
