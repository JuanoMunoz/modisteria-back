const { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo } = require("../repositories/insumo.repository");

exports.getAllInsumos = async (req, res) => {
  try {
    const insumos = await getAllInsumos();
    res.status(200).json(insumos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getInsumoById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const insumo = await getInsumoById(id);
        res.status(200).json(insumo);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Agregar validacion con consulta de tipo de categoria para que solo se pueda agregar una con tipo Insumo
exports.createInsumo = async (req, res) => {
    const insumo = req.body;

    try {
        console.log(req.body);
        await createInsumo(insumo);
        res.status(201).json({msg: 'insumo creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateInsumo = async (req, res) => {
    const { id } = req.params;
    const insumo = req.body;
    try {
        await updateInsumo(id, insumo);
        res.status(201).json({msg: 'insumo actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusInsumo = async (req, res) => {
    const { id } = req.params;

    try {
        await statusInsumo(id);
        res.status(201).json({msg: 'insumo inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteInsumo = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteInsumo(id);
        res.status(201).json({msg: 'insumo eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}