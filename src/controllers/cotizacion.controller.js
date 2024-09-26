const { Op } = require("sequelize");
const { Pedido, Cotizacion, CotizacionPedidos } = require("../models");
const { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion, getAllCotizacionPedidos } = require("../repositories/cotizacion.repository");
const { helperImg, uploadToCloudinary, getPublicIdFromUrl, deleteFromCloudinary } = require("../utils/image");
const { createCotizacionPedidos, deleteCotizacionPedidos } = require("../repositories/cotizacion_pedidos.repository");

exports.getAllCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await getAllCotizaciones();
        res.status(200).json(cotizaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.getCotizacionById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const cotizacion = await getCotizacionById(id);
        res.status(200).json(cotizacion);
    } catch (error) {
        res.status(500).json(error);
    }
};

const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const ordenarArr1 = arr1.slice().sort();
    const ordenarArr2 = arr2.slice().sort();
    return ordenarArr1.every((value, index) => value === ordenarArr2[index]);
};

exports.createCotizacion = async (req, res) => {
    try {
        const { nombrePersona, pedidoId, valorDomicilio, valorPrendas, metodoPago } = req.body;

        let pedidoIdsArray;
        if (typeof pedidoId === 'string') {
            pedidoIdsArray = pedidoId.split(',').map(id => parseInt(id.trim()));
        } else if (Array.isArray(pedidoId)) {
            pedidoIdsArray = pedidoId.map(id => parseInt(id));
        } else {
            return res.status(400).json({ error: 'Formato de pedidoId inválido' });
        }

        const pedidos = await Pedido.findAll({
            where: {
                id: { [Op.in]: pedidoIdsArray }
            },
            attributes: ['id', 'usuarioId']
        });

        const cotizacionesExistentes = await Cotizacion.findAll({
            include: [
                {
                    model: CotizacionPedidos,
                    as: 'cotizacion_pedidos',
                    include: [
                        {
                            model: Pedido,
                            as: 'pedido',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });

        // Verificar si ya existe una cotización con la misma combinación de pedidos
        for (const cotizacion of cotizacionesExistentes) {
            const pedidoIdsExistentes = cotizacion.cotizacion_pedidos
                .filter(cotizacion_pedido => cotizacion_pedido.pedido)
                .map(cotizacion_pedido => cotizacion_pedido.pedido.id);

            if (arraysEqual(pedidoIdsArray, pedidoIdsExistentes)) {
                return res.status(400).json({ error: 'La combinación de pedidos ya existe en otra cotización' });
            }
        }

        if (!pedidos.length) {
            return res.status(400).json({ error: 'Pedido(s) inválido(s) proporcionado(s)' });
        }

        const usuarioIdSet = new Set(pedidos.map(pedido => pedido.usuarioId));

        if (usuarioIdSet.size > 1) {
            return res.status(400).json({ error: 'Los pedidos pertenecen a múltiples usuarios' });
        }

        const usuarioId = [...usuarioIdSet][0];

        let imagen = null;

        // Verificar el método de pago y gestionar la imagen
        if (metodoPago === 'efectivo') {
            imagen = null;
        } else if (metodoPago === 'transferencia') {
            if (!req.file) {
                return res.status(400).json({ error: 'Se requiere una imagen para el método de pago transferencia' });
            }
            const processedBuffer = await helperImg(req.file.buffer, 300);
            const result = await uploadToCloudinary(processedBuffer);
            imagen = result.url;
        }

        const valorDomicilioNum = parseFloat(valorDomicilio) || 0;
        const valorPrendasNum = parseFloat(valorPrendas) || 0;

        const newCotizacion = {
            imagen,
            nombrePersona,
            valorDomicilio,
            valorPrendas,
            valorFinal: valorDomicilioNum + valorPrendasNum,
            metodoPago,
            pedidoId: pedidoIdsArray,
            estadoId: 3
        };

        const cotizacionCreada = await createCotizacion(newCotizacion);
        await createCotizacionPedidos(cotizacionCreada.id, cotizacionCreada.pedidoId);
        res.status(201).json({ msg: 'Cotización creada exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la cotización' });
    }
};

exports.updateCotizacion = async (req, res) => {
    const { id } = req.params;
    const { nombrePersona, pedidoId, valorDomicilio, valorPrendas, metodoPago } = req.body;

    try {
        const existingCotizacion = await getCotizacionById(id);
        if (!existingCotizacion) {
            return res.status(404).json({ error: 'Cotización no encontrada' });
        }

        let pedidoIdsArray;
        if (typeof pedidoId === 'string') {
            pedidoIdsArray = pedidoId.split(',').map(id => parseInt(id.trim()));
        } else if (Array.isArray(pedidoId)) {
            pedidoIdsArray = pedidoId.map(id => parseInt(id));
        } else {
            return res.status(400).json({ error: 'Formato de pedidoId inválido' });
        }

        const pedidos = await Pedido.findAll({
            where: { id: { [Op.in]: pedidoIdsArray } },
            attributes: ['id', 'usuarioId']
        });

        if (!pedidos.length) {
            return res.status(400).json({ error: 'Pedido(s) inválido(s) proporcionado(s)' });
        }

        const usuarioIdSet = new Set(pedidos.map(pedido => pedido.usuarioId));
        if (usuarioIdSet.size > 1) {
            return res.status(400).json({ error: 'Los pedidos pertenecen a múltiples usuarios' });
        }

        const valorDomicilioNum = parseFloat(valorDomicilio) || existingCotizacion.valorDomicilio;
        const valorPrendasNum = parseFloat(valorPrendas) || existingCotizacion.valorPrendas;

        const updatedCotizacion = {
            nombrePersona: nombrePersona || existingCotizacion.nombrePersona,
            valorDomicilio: valorDomicilioNum,
            valorPrendas: valorPrendasNum,
            valorFinal: valorDomicilioNum + valorPrendasNum,
            metodoPago: metodoPago || existingCotizacion.metodoPago,
            pedidoId: pedidoIdsArray || existingCotizacion.pedidoId,
            imagen: existingCotizacion.imagen,
            estadoId: 3
        };

        // Verificar el método de pago y gestionar la imagen
        if (metodoPago === 'efectivo') {
            updatedCotizacion.imagen = null; 
        } else if (metodoPago === 'transferencia') {
            if (req.file) {
                const processedBuffer = await helperImg(req.file.buffer, 300);
                const result = await uploadToCloudinary(processedBuffer);
                updatedCotizacion.imagen = result.url;

                if (existingCotizacion.imagen) {
                    const publicId = getPublicIdFromUrl(existingCotizacion.imagen);
                    await deleteFromCloudinary(publicId);
                }
            } else {
                return res.status(400).json({ error: 'Se requiere una imagen para el método de pago transferencia' });
            }
        }

        await deleteCotizacionPedidos(id);
        const cotizacion = await updateCotizacion(id, updatedCotizacion);
        await createCotizacionPedidos(id, updatedCotizacion.pedidoId);
        res.status(200).json({ msg: 'Cotización actualizada exitosamente' });
    } catch (error) {
        console.error('Error actualizando la cotización:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.statusCotizacion = async (req, res) => {
    const { id } = req.params;

    try {
        await statusCotizacion(id);
        res.status(201).json({ msg: 'Cotizacion inactivo' });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteCotizacion = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteCotizacion(id);
        res.status(200).json({ msg: 'Cotización eliminada exitosamente' });
    } catch (error) {
        console.error('Error en la eliminación de la cotización:', error);
        res.status(500).json({ error: error.message });
    }
};
