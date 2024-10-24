const { Domicilio, Usuario, Role, Venta, Cotizacion, Pedido, CotizacionPedidos, Estado } = require("../models");
const { getAllDomiciliarios } = require("./usuario.repository");

exports.getAllDomicilios = async () => {
    return await Domicilio.findAll({
        include: [
            {
                model: Venta,
                as: 'ventas',
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
            }
        ]
    });
};

exports.getDomicilioById = async (id) => {
    return await Domicilio.findOne({
        where: { id },
        include: [
            {
                model: Venta,
                as: 'ventas',
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
            }
        ]
    });
};


exports.getDomiciliosByDomiciliario = async (usuarioId) => {
    return await Domicilio.findAll({
        include: [
            {
                model: Venta,
                as: 'ventas',
                include: [
                    {
                        model: Pedido,
                        as: 'pedidos',
                        include: [
                            {
                                model: Usuario,
                                as: 'usuario',
                                where: { id: usuarioId }
                            }
                        ]
                    }
                ]
            }
        ]
    });
};


exports.getDomiciliosByClienteId = async (clienteId) => {
    try {
        const domicilios = await Domicilio.findAll({
            include: [
                {
                    model: Venta,
                    as: 'ventas',
                    include: [
                        {
                            model: Pedido,
                            as: 'pedidos',
                            include: [
                                {
                                    model: Usuario,
                                    as: 'usuario'
                                }
                            ]
                        }
                    ]
                }
            ],
            where: {
                '$ventas.pedidos.usuarioId$': clienteId 
            }
        });

        if (domicilios.length === 0) {
            return {
                message: `No se encontraron domicilios para el cliente con ID ${clienteId}.`,
                status: 404
            };
        }

        return domicilios;

    } catch (error) {
        console.error("Error al obtener los domicilios:", error);
        throw error;
    }
};

exports.createDomicilio = async (domicilio) => {
    return await Domicilio.create(domicilio);
};

exports.createDomicilioVenta = async (ventaId) => {
    try {
        const venta = await Venta.findByPk(ventaId); 

        if (!venta) {
            throw new Error('Venta no encontrada');
        }

        const domiciliarios = await getAllDomiciliarios(4);

        if (domiciliarios.length === 0) {
            throw new Error('No se encontraron domiciliarios disponibles');
        }

        const domiciliarioAleatorio = domiciliarios[Math.floor(Math.random() * domiciliarios.length)];

        const nuevoDomicilio = await Domicilio.create({
            ventaId: venta.id, 
            usuarioId: domiciliarioAleatorio.id,
            estadoId: 3,
        });

        return nuevoDomicilio;
        
    } catch (error) {
        console.error('Error al crear el domicilio para la venta:', error);
        throw error; 
    }
};

exports.updateDomicilio = async (id, domicilio) => {
    return await Domicilio.update(domicilio, { where: { id } });
}

exports.statusDomicilio = async (id) => {
    return await Domicilio.update({ estado: false }, { where: { id } });
}
exports.deleteDomicilio = async (id) => {
    // const domicilio = await Domicilio.findByPk(id);
    
    // if (!domicilio) {
    //     throw new Error("Domicilio no encontrado");
    // }

    // const existeUsuario = await Usuario.findOne({ where: { id: domicilio.usuarioId } });
    // const existeEstado = await Estado.findOne({ where: { id: domicilio.estadoId } });
    // const existeVenta = await Venta.findOne({ where: { id: domicilio.ventaId } });
    
    // if (existeUsuario || existeEstado || existeVenta) {
    //     throw new Error("No se puede eliminar el domicilio porque está asociado a registros en otras tablas");
    // }

    return await Domicilio.destroy({ where: { id } });
}

