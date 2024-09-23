const { Venta } = require("../models");

exports.getAllVentas = async () => {
    return await Venta.findAll();
};

exports.getVentaById = async (id) => {
    return await Venta.findByPk(id);
};

exports.createVenta = async (venta) => {
    return await Venta.create(venta);
};
