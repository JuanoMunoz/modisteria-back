const { getAllCitas, getCitaById, createCita, updateCita, deleteCita } = require("../repositories/cita.repository");

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await getAllCitas();
    res.status(200).json(citas);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCitaById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const cita = await getCitaById(id);
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createCita = async (req, res) => {
    try {
        console.log(req.body);
        const cita = req.body;
        await createCita(cita);
        res.status(201).json({msg: 'cita creada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateCita = async (req, res) => {
    const { id } = req.params;

    try {
        const cita = req.body;
        await updateCita(id, cita);
        res.status(201).json({msg: 'cita actualizada exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusCita = async (req, res) => {
    const { id } = req.params;
    try {
        await statusCita(id);
        res.status(201).json({msg: 'cita inactiva'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCita = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCita(id);
        res.status(201).json({msg: 'cita eliminada'});
    } catch (error) {
        res.status(500).json(error);
    }
}