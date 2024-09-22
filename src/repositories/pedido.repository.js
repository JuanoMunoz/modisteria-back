const {Pedido} = require('../models');
const {Op} = require('sequelize');

exports.getAllPedido = async() =>{
    return await Pedido.findAll();
}

exports.getPedidoById = async (usuarioId) => {
    return await Pedido.findAll({where:{usuarioId}});
}

exports.createPedido = async (pedido) => {
    return await Pedido.create(pedido);
}

exports.updatePedido = async (idPedido, pedido) => {
    return await Pedido.update(pedido, { where: { idPedido } });
}

exports.statusPedido = async (id) => {
    return await Pedido.update({ estado: false }, { where: { id } });
}
exports.deletePedido = async (id) => {
    return await Pedido.destroy( { where: { id } });
}
