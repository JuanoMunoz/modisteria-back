const {Pedido, Catalogo} = require('../models');
const {Op} = require('sequelize');

exports.getAllPedido = async() =>{
    return await Pedido.findAll();
}

exports.getPedidoById = async (usuarioId,catalogoId,talla) => {
    const whereClause = {
        usuarioId
    }
    if (catalogoId){
        whereClause.catalogoId = catalogoId
    }
    if (talla){
        whereClause.talla = talla
    }
    return await Pedido.findAll({ where: whereClause, include: { model: Catalogo, as:'catalogo',attributes:["producto","imagen","precio"]}});
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
exports.deletePedido = async (idPedido) => {
    return await Pedido.destroy( { where: { idPedido } });
}
