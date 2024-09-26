const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require("../repositories/role.repository");
const { createRolesPermiso, deleteRolesPermiso } = require("../repositories/roles_permisos.repository");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const role = await getRoleById(id);
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createRole = async (req, res) => {
    const { nombre, permisosId, estadoId } = req.body;
    console.log("nombre", nombre);
    console.log("permisos", permisosId);

    try {
        const newRole = await createRole(nombre, permisosId, estadoId);
        await createRolesPermiso(newRole.id, permisosId);
        res.status(201).json({msg: 'rol creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { nombre, permisosId, estadoId } = req.body;  
    try {
        await deleteRolesPermiso(id);
        await updateRole(id, nombre, permisosId, estadoId );
        await createRolesPermiso(id, permisosId);

        res.status(201).json({ msg: 'Rol actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.statusRole = async (req, res) => {
    const { id } = req.params;

    try {
        await statusRole(id);
        res.status(201).json({msg: 'Rol inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteRole(id);
        res.status(201).json({ msg: 'Rol eliminado' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
