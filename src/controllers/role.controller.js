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
    // const role = req.body;
    const { nombre, permisosId, estadoId } = req.body;
    console.log("nombre", nombre);
    console.log("permisos", permisosId);

    try {
        const newRole = await createRole(nombre, permisosId, estadoId);
        createRolesPermiso(newRole.id, permisosId);
        res.status(201).json({msg: 'rol creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//1 recibir el arreglo de permisos, 2 traer todos los permisos que tiene ese rol (consulta db), 3 dividir cuáles permisos no existen en el arr de db y agregarlos y eliminar los que ya no estan en el que me enviaron (enviado: 4,5) (db: 12345) eliminar delete 123 y dejar 4 y agregar create 5

//otra opcion db delete todos los permisos que tengan el rol 1 y crear todos permisos de nuevo 
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
        res.status(201).json({msg: 'rol inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteRole(id);
        res.status(201).json({ msg: 'rol eliminado' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
