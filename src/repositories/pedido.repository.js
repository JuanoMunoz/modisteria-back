const {Pedido, Catalogo, Venta} = require('../models');
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

exports.getPedidoByUsuarioyEstado = async (id) => {
    return await Pedido.findAll({ estado: 3 }, { where: { id } });
}

exports.getPedidoByVenta = async (idVenta) => {
    return await Pedido.findAll({ estado: 3 }, { where: { ventaId: idVenta } });
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
    const pedido = await Pedido.findByPk(id);
    
    if (!pedido) {
        throw new Error("Pedido no encontrado");
    }

    // const existeEnCotizacionPedidos = await CotizacionPedidos.findOne({ where: { pedidoId: pedido.id } }); 
    // const existeCatalogo = await Pedido.findOne({ where: { id: pedido.catalogoId } });
    
    // if (existeEnCotizacionPedidos || existeCatalogo) {
    //     throw new Error("No se puede eliminar el pedido porque está asociado a registros en otras tablas");
    // }

    return await Pedido.destroy( { where: { id } });
}
