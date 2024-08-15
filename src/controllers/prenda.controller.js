const { getAllPrendas, getPrendaById, createPrenda, updatePrenda, deletePrenda } = require("../repositories/prenda.repository");

exports.getAllPrendas = async (req, res) => {
  try {
    const prenda = await getAllPrendas();
    res.status(200).json(prenda);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getPrendaById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const prenda = await getPrendaById(id);
        res.status(200).json(prenda);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createPrenda = async (req, res) => {
    const prenda = req.body;

    try {
        console.log(req.body);
        await createPrenda(prenda);
        res.status(201).json({msg: 'prenda creada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updatePrenda = async (req, res) => {
    const { id } = req.params;
    const prenda = req.body;
    try {
        await updatePrenda(id, prenda);
        res.status(201).json({msg: 'prenda actualizada exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusPrenda = async (req, res) => {
    const { id } = req.params;

    try {
        await statusPrenda(id);
        res.status(201).json({msg: 'prenda inactiva'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deletePrenda = async (req, res) => {
    const { id } = req.params;

    try {
        await deletePrenda(id);
        res.status(201).json({msg: 'prenda eliminada'});
    } catch (error) {
        res.status(500).json(error);
    }
}