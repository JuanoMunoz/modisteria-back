const {
  getAllPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
} = require("../repositories/permiso.repository");

exports.getAllPermisos = async (req, res) => {
  try {
    const permisos = await getAllPermisos();
    res.status(200).json(permisos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getPermisoById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(id);
    const permiso = await getPermisoById(id);
    res.status(200).json(permiso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createPermiso = async (req, res) => {
  const permiso = req.body;

  try {
    console.log(req.body);
    await createPermiso(permiso);
    res.status(201).json({ msg: "permiso creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.updatePermiso = async (req, res) => {
  const { id } = req.params;
  const permiso = req.body;

  try {
    await updatePermiso(id, permiso);
    res.status(201).json({ msg: "permiso actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.statusPermiso = async (req, res) => {
  const { id } = req.params;

  try {
    await statusPermiso(id);
    res.status(201).json({ msg: "permiso inactivo" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deletePermiso = async (req, res) => {
  const { id } = req.params;

  try {
    await deletePermiso(id);
    res.status(201).json({ msg: "Permiso eliminado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
