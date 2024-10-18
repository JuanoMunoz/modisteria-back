const { Venta, Cotizacion, CotizacionPedidos, Pedido, Catalogo, Usuario } = require("../models");

exports.getAllVentas = async () => {
    return await Venta.findAll();
};

exports.getVentaById = async (id) => {
    return await Venta.findByPk(id);
};

exports.createVenta = async (venta) => {
    return await Venta.create(venta);
};

exports.updateVenta = async (id, venta) => {
    return await Venta.update(venta, { where: { id } });
}

exports.getAllInfoByVentaID = async (ventaId) => {
    return await Venta.findAll({
        where: { id: ventaId },
        include: [
            {
                model: Cotizacion,
                as: 'cotizacion',
                attributes: ['metodoPago', 'nombrePersona', 'valorFinal'],
                include: [
                    {
                        model: CotizacionPedidos,
                        as: 'cotizacion_pedidos',
                        include: [
                            {
                                model: Pedido,
                                as: 'pedido',
                                attributes: ['catalogoId', 'talla', 'cantidad', 'usuarioId'],
                                include: [
                                    {
                                        model: Catalogo,
                                        as: 'catalogo',
                                        attributes: ['id', 'producto', 'precio'],
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        raw: true
    });
};

exports.getVentaByUsuarioId = async (usuarioId) => {
    const ventaByUsuario = await Venta.findAll({
        include: [
            {
                model: Cotizacion,
                as: 'cotizacion',
                include: [
                    {
                        model: CotizacionPedidos,
                        as: 'cotizacion_pedidos',
                        include: [
                            {
                                model: Pedido,
                                as: 'pedido',
                                include: [
                                    {
                                        model: Usuario,
                                        as: 'usuario',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        where: {
            '$cotizacion.cotizacion_pedidos.pedido.usuarioId$': usuarioId 
        }
    });

    if (ventaByUsuario.length === 0) {
        return {
            message: `No se encontraron ventas del usuario con ID ${usuarioId}.`,
            status: 404
        };
    }

    return ventaByUsuario;
};
