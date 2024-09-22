const {getAllPedido, getPedidoById, createPedido, updatePedido, deletePedido} = require('../repositories/pedido.repository.js')

exports.getAllPedido = async(req, res)=>{
    try {
        const pedidos = await getAllPedido()
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const Pedido = await getPedidoById(id);
        res.status(200).json(Pedido);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createPedido = async (req, res) => {
    const Pedido = req.body;

    try {
        console.log(req.body);
        await createPedido(Pedido);
        res.status(201).json({msg: 'Pedido creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updatePedido = async (req, res) => {
    const { idPedido } = req.params;
    const Pedido = req.body;


    try {
        await updatePedido(idPedido, Pedido);
        res.status(201).json({msg: 'Pedido actualizada exitosamente'});
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.statusPedido = async (req, res) => {
    const { id } = req.params;
    try {
        await statusPedido(id);
        res.status(201).json({msg: 'Pedido inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePedido(id);
        res.status(201).json({msg: 'Pedido eliminada'});
    } catch (error) {
        res.status(400).json(error);
    }
}