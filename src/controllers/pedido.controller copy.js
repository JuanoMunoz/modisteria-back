const { Venta } = require('../models/venta.model.js');
const {getAllPedido, getPedidoById, createPedido, updatePedido, deletePedido, findVentaByPedidoUsuarioId } = require('../repositories/pedido.repository.js');
const { createVenta, updateVenta } = require('../repositories/venta.repository.js');
const { helperImg, uploadToCloudinary } = require('../utils/image.js');

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
    const catalogoId = req.query.catalogoId
    const talla = req.query.talla
    try {
        console.log(id);
        const Pedido = await getPedidoById(id,catalogoId,talla);
        res.status(200).json(Pedido);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createPedido = async (req, res) => {
    try {
        const { idPedido, cantidad, tallaId, usuarioId, catalogoId, nombrePersona, valorDomicilio, valorPrendas, metodoPago } = req.body;
        let imagen = null;

        // 1. Verificar y gestionar la imagen en función del método de pago
        imagen = await gestionImagen(req, metodoPago);

        const valorDomicilioNum = parseFloat(valorDomicilio) || 0;
        const valorPrendasNum = parseFloat(valorPrendas) || 0;

        // 2. Buscar o crear una venta activa (a través del pedido)
        let venta = await gestionVentaPorPedido(usuarioId, nombrePersona, valorDomicilioNum, valorPrendasNum, imagen, metodoPago);

        // 3. Crear el nuevo pedido y asociarlo a la venta
        const newPedido = {
            idPedido,
            cantidad,
            tallaId,
            usuarioId,
            catalogoId,
            ventaId: venta.id, // Asociar el pedido a la venta existente o recién creada
            estadoId: 3 // Estado activo o en proceso
        };

        const pedidoCreado = await createPedido(newPedido);

        // 4. Responder con éxito
        res.status(201).json({ msg: 'Pedido creado exitosamente', pedido: pedidoCreado, venta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

// Función para gestionar la imagen del pago
async function gestionImagen(req, metodoPago) {
    let imagen = null;

    if (metodoPago === 'efectivo') {
        imagen = null;
    } else if (metodoPago === 'transferencia') {
        if (!req.file) {
            throw new Error('Se requiere una imagen para el método de pago transferencia');
        }
        const processedBuffer = await helperImg(req.file.buffer, 300);
        const result = await uploadToCloudinary(processedBuffer);
        imagen = result.url;
    }
    return imagen;
}

// Función para gestionar la venta (buscar o crear si no existe, a través del pedido)
async function gestionVentaPorPedido(usuarioId, nombrePersona, valorDomicilioNum, valorPrendasNum, imagen, metodoPago) {
    // Verificar si ya existe una venta activa para el usuario a través de sus pedidos
    let venta = await findVentaByPedidoUsuarioId(usuarioId);

    if (venta) {
        // Si existe una venta, actualizar los valores
        venta.valorPrendas += valorPrendasNum;
        venta.valorFinal = venta.valorPrendas + (venta.valorDomicilio || 0); // Actualiza el valor final
        await updateVenta(venta); // Actualiza la venta en la base de datos
    } else {
        // Si no existe una venta, crear una nueva
        venta = await createVenta({
            fecha: new Date(),
            imagen,
            nombrePersona,
            valorDomicilio: valorDomicilioNum,
            valorPrendas: valorPrendasNum,
            valorFinal: valorDomicilioNum + valorPrendasNum,
            metodoPago,
            estadoId: 3 // Estado activo o en proceso
        });
    }

    return venta;
}

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
        return res.status(400).json({ message: error.message });
    }
}