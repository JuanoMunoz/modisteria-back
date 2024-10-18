const { getAllTallas, getTallaById, createTalla, updateTalla, deleteTalla } = require("../repositories/talla.repository");

exports.getAllTallas = async (req, res) => {
  try {
    const tallas = await getAllTallas();
    res.status(200).json(tallas);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getTallaById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const talla = await getTallaById(id);
        res.status(200).json(talla);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createTalla = async (req, res) => {
    const talla = req.body;

    try {
        console.log(req.body);
        await createTalla(talla);
        res.status(201).json({msg: 'Talla creada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateTalla = async (req, res) => {
    const { id } = req.params;
    const talla = req.body;

    try {
        await updateTalla(id, talla);
        res.status(201).json({msg: 'Talla actualizada exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusTalla = async (req, res) => {
    const { id } = req.params;

    try {
        await statusTalla(id);
        res.status(201).json({msg: 'Talla inactiva'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteTalla = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteTalla(id);
        res.status(201).json({msg: 'Talla eliminada'});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}