const { Cotizacion } = require("../models");

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
}

exports.statusCotizacion = async (id) => {
    return await Cotizacion.update({ estado: false }, { where: { id } });
}

exports.deleteCotizacion = async (id) => {
    return await Cotizacion.destroy({ where: { id } });
}
