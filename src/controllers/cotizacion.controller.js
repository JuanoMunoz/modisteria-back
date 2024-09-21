const { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion } = require("../repositories/cotizacion.repository");

exports.getAllCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await getAllCotizaciones();
    res.status(200).json(cotizaciones);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCotizacionById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const cotizacion = await getCotizacionById(id);
        res.status(200).json(cotizacion);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createCotizacion = async (req, res) => {
    const cotizacion = req.body;

    try {
        console.log(req.body);
        await createCotizacion(cotizacion);
        res.status(201).json({msg: 'Cotizacion creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateCotizacion = async (req, res) => {
    const { id } = req.params;
    const cotizacion = req.body;
    try {
        await updateCotizacion(id, cotizacion);
        res.status(201).json({msg: 'Cotizacion actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusCotizacion = async (req, res) => {
    const { id } = req.params;

    try {
        await statusCotizacion(id);
        res.status(201).json({msg: 'Cotizacion inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCotizacion = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteCotizacion(id);
        res.status(201).json({msg: 'Cotizacion eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}