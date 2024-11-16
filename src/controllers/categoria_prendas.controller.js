const {
  getAllCategoriaPrendas,
  getCategoriaPrendaById,
  createCategoriaPrenda,
  updateCategoriaPrenda,
  deleteCategoriaPrenda,
  statusCategoriaPrenda,
} = require("../repositories/categoria_prendas.repository");

exports.getAllCategoriaPrendas = async (req, res) => {
  try {
    const type = req.query.type || false;

    const categorias = await getAllCategoriaPrendas(type);
    res.status(200).json(categorias);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getCategoriaPrendaById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const categoria = await getCategoriaPrendaById(id);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createCategoriaPrenda = async (req, res) => {
  const categoria = req.body;

  try {
    console.log(req.body);
    await createCategoriaPrenda(categoria);
    res.status(201).json({ msg: "categoria creada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  const categoria = req.body;

  try {
    await updateCategoriaPrenda(id, categoria);
    res.status(201).json({ msg: "categoria actualizada exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.statusCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  try {
    await statusCategoriaPrenda(id);
    res.status(201).json({ msg: "categoria inactiva" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategoriaPrenda(id);
    res.status(201).json({ msg: "categoria eliminada" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};