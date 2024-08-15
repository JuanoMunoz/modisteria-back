const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo } = require("../repositories/catalogo.repository");

exports.getAllCatalogo = async (req, res) => {
  try {
    const catalogo = await getAllCatalogo();
    res.status(200).json(catalogo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCatalogoById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const catalogo = await getCatalogoById(id);
        res.status(200).json(catalogo);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createCatalogo = async (req, res) => {
    try {
        console.log(req.body);
        const catalogo = req.body;
        await createCatalogo(catalogo);
        res.status(201).json({msg: 'catalogo creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const catalogo = req.body;
        await updateCatalogo(id, catalogo);
        res.status(201).json({msg: 'catalogo actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        await statusCatalogo(id);
        res.status(201).json({msg: 'catalogo inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCatalogo(id);
        res.status(201).json({msg: 'catalogo eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}