const { Compras } = require("../models");

exports.getAllCompras = async () => {
    return await Compras.findAll();
};

exports.getCompraById = async (id) => {
    return await Compras.findByPk(id);
}

exports.createCompra = async (compra) => {
    return await Compras.create(compra);
}
