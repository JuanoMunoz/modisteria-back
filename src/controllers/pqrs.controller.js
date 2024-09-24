const { getAllPQRS, getPQRSById, createPQRS, updatePQRS, deletePQRS } = require("../repositories/pqrs.repository");

exports.getAllPQRS = async (req, res) => {
  try {
    const pqrs = await getAllPQRS();
    res.status(200).json(pqrs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};




exports.getPQRSById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const pqrs = await getPQRSById(id);
        res.status(200).json(pqrs);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createPQRS = async (req, res) => {
    const pqrs = req.body;

    try {
        console.log(req.body);
        await createPQRS(pqrs);
        res.status(201).json({msg: 'PQRS creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updatePQRS = async (req, res) => {
    const { id } = req.params;
    const pqrs = req.body;
    try {
        await updatePQRS(id, pqrs);
        res.status(201).json({msg: 'PQRS actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusPQRS = async (req, res) => {
    const { id } = req.params;

    try {
        await statusPQRS(id);
        res.status(201).json({msg: 'PQRS inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deletePQRS = async (req, res) => {
    const { id } = req.params;

    try {
        await deletePQRS(id);
        res.status(201).json({msg: 'PQRS eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}