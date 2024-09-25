const { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria, getCategoriaByTipo } = require("../repositories/categoria.repository");

exports.getAllCategorias = async (req, res) => {
    try {
        const type = req.query.type|| false
        
    const categorias = await getAllCategorias(type);
    res.status(200).json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCategoriaById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const categoria = await getCategoriaById(id);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createCategoria = async (req, res) => {
    const categoria = req.body;

    try {
        console.log(req.body);
        await createCategoria(categoria);
        res.status(201).json({msg: 'categoria creada exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = req.body;

    try {
        await updateCategoria(id, categoria);
        res.status(201).json({msg: 'categoria actualizada exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        await statusCategoria(id);
        res.status(201).json({msg: 'categoria inactiva'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCategoria(id);
        res.status(201).json({msg: 'categoria eliminada'});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getCategoriaByTipo = async(req, res)=>{
    const {tipo} = req.params
    try {
        const categorias = await getCategoriaByTipo(tipo)
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json(error)
    }
}