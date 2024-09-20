const {Pedido} = require('../models');
const {Op} = require('sequelize');

exports.getAllPedido = async() =>{
    return await Pedido.findAll();
}

exports.getPedidoById = async (id) => {
    return await Pedido.findByPk(id);
}

exports.createPedido = async (pedido) => {
    return await Pedido.create(pedido);
}

exports.updatePedido = async (id, pedido) => {
    return await Pedido.update(pedido, { where: { id } });
}

exports.statusPedido = async (id) => {
    return await Pedido.update({ estado: false }, { where: { id } });
}
exports.deletePedido = async (id) => {
    return await Pedido.destroy( { where: { id } });
}
