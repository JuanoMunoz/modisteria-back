const { Venta, Cotizacion, CotizacionPedidos, Pedido, Catalogo, Usuario } = require("../models");
const {getPriceById, getDateById} = require('../repositories/cita.repository.js')
const {Cita} = require('../models/cita.model.js') 

exports.getAllVentas = async () => {
    return await Venta.findAll();
};

exports.getVentaById = async (id) => {
    return await Venta.findByPk(id);
};

exports.createVenta = async (venta) => {
    return await Venta.create(venta);
};

exports.createVentaAC = async (citaId) => {
    try {
        const cita = await Cita.findByPk(citaId); 

        if (!cita) {
            throw new Error('Cita no encontrada');
        }
        const nuevaVenta = await Venta.create({
            fecha: new Date(),
            citaId: cita.id, 
            valorFinal: cita.precio,
            estadoId: 14, 
            metodoPago: 'efectivo'
        });

        return nuevaVenta;
        
    } catch (error) {
        console.error('Error al crear la venta:', error);
        throw error; 
    }
};


exports.updateVenta = async (id, venta) => {
    return await Venta.update(venta, { where: { id } });
}

exports.getAllInfoByVentaID = async (ventaId) => {
    return await Venta.findOne({
        where: { id: ventaId },
        include: [
            {
                model: Pedido,
                as: 'pedidos',
                attributes: ['catalogoId', 'tallaId', 'cantidad', 'usuarioId'],
                include: [
                    {
                        model: Catalogo,
                        as: 'catalogo',
                        attributes: ['id', 'producto', 'precio'],
                    }
                ]
            }
        ],
        raw: true
    });
};


exports.getVentaByUsuarioId = async (usuarioId) => {
    const ventaByUsuario = await Venta.findAll({
        where: {
            '$pedidos.usuarioId$': usuarioId 
        },
        include: [
            {
                model: Pedido,
                as: 'pedidos', 
                include: [
                    {
                        model: Usuario,
                        as: 'usuario', 
                    }
                ]
            }
        ]
    });

    if (ventaByUsuario.length === 0) {
        return {
            message: `No se encontraron ventas del usuario con ID ${usuarioId}.`,
            status: 404
        };
    }

    return ventaByUsuario;
};

