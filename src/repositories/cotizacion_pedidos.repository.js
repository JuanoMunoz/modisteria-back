const { CotizacionPedidos } = require("../models");

exports.createCotizacionPedidos = async (cotizacionId, pedidosId) => {
    for (const pedidoId of pedidosId) {
        await CotizacionPedidos.create({ cotizacionId, pedidoId });
    }
};

exports.deleteCotizacionPedidos = async (id) => {
    return await CotizacionPedidos.destroy( { where: { cotizacionId: id } });
}

