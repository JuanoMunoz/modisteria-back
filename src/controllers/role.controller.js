const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require("../repositories/role.repository");

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
    const role = req.body;

    try {
        console.log(req.body);
        await createRole(role);
        res.status(201).json({msg: 'rol creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const role = req.body;
    try {
        await updateRole(id, role);
        res.status(201).json({msg: 'rol actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusRole = async (req, res) => {
    const { id } = req.params;

    try {
        await statusRole(id);
        res.status(201).json({msg: 'rol inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteRole(id);
        res.status(201).json({msg: 'rol eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}