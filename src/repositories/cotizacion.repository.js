const { Cotizacion, Estado } = require("../models");

exports.getAllCotizaciones = async () => {
    return await Cotizacion.findAll();
};

exports.getAllCotizacionPedidos = async (pedidoId) => {
    return await Cotizacion.findAll({ where: pedidoId});
};

exports.getCotizacionById = async (id) => {
    return await Cotizacion.findByPk(id);
}

exports.createCotizacion = async (cotizacion) => {
    return await Cotizacion.create(cotizacion);
}

exports.updateCotizacion = async (id, cotizacion) => {
    return await Cotizacion.update(cotizacion, { where: { id } });
};

exports.statusCotizacion = async (id) => {
    return await Cotizacion.update({ estado: false }, { where: { id } });
}

exports.deleteCotizacion = async (id) => {
    const cotizacion = await Cotizacion.findOne({
        where: { id }
    });
    
    if (!cotizacion) {
        throw new Error("Cotización no encontrada");
    }

    // const existePermiso = cotizacion.pedidoId && cotizacion.pedidoId.length > 0;
    // const existeEstado = await Estado.findOne({ where: { id: cotizacion.estadoId } });
    
    // if (existePermiso || existeEstado) {
    //     throw new Error("No se puede eliminar la cotización porque está asociada a registros en otras tablas");
    // }
    return await Cotizacion.destroy({ where: { id } });
}
