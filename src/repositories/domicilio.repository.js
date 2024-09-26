const { Domicilio, Usuario, Role, Venta, Cotizacion, Pedido } = require("../models");

exports.getAllDomicilios = async () => {
    return await Domicilio.findAll({
        include: [
            {
                model: Venta,
                as: 'ventas',
                include: [
                    {
                        model: Cotizacion,
                        as: 'cotizacion',
                        //   attributes: ['id', 'pedidoId'],
                        include: [
                            {
                                model: Pedido,
                                as: 'pedido'
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
        where: { id }, include: [
            {
                model: Venta,
                as: 'ventas',
                include: [
                    {
                        model: Cotizacion,
                        as: 'cotizacion',
                        //   attributes: ['id', 'pedidoId'],
                        include: [
                            {
                                model: Pedido,
                                as: 'pedido'
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
        where: { usuarioId: usuarioId },
        include: [
            {
                model: Venta,
                as: 'ventas',
                include: [
                    {
                        model: Cotizacion,
                        as: 'cotizacion',
                        //   attributes: ['id', 'pedidoId'],
                        include: [
                            {
                                model: Pedido,
                                as: 'pedido'
                            }
                        ]
                    }
                ]
            }
        ]
    });
};


exports.getDomiciliosByCliente = async (clienteId) => {
    return await Domicilio.findAll({
        include: [
            {
                model: Venta,
                as: 'ventas',
                include: [
                    {
                        model: Cotizacion,
                        as: 'cotizacion',
                        include: [
                            {
                                model: Pedido,
                                as: 'pedido',
                                where: { usuarioId: clienteId },  
                            }
                        ]
                    }
                ]
            }
        ]
    });
};


exports.createDomicilio = async (domicilio) => {
    const user = await Usuario.findByPk(domicilio.usuarioId);

    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const rol = await Role.findByPk(user.roleId);

    if (!rol || rol.nombre !== 'DOMICILIARIO') {
        const domiciliarios = await Usuario.findAll({
            include: { model: Role, where: { nombre: 'DOMICILIARIO' } }
        });

        if (domiciliarios.length === 0) {
            throw new Error('No hay domiciliarios disponibles.');
        } else {
            throw new Error('Solo un usuario con rol domiciliario puede crear un domicilio.');
        }
    }

    // Si se llega a este punto, el usuario tiene el rol 'Domiciliario'
    return await Domicilio.create(domicilio);
};

exports.updateDomicilio = async (id, domicilio) => {
    return await Domicilio.update(domicilio, { where: { id } });
}

exports.statusDomicilio = async (id) => {
    return await Domicilio.update({ estado: false }, { where: { id } });
}
exports.deleteDomicilio = async (id) => {
    return await Domicilio.destroy({ where: { id } });
}

//Poner que solo se pueda el usuario de domiciliario y si no hay registros con ese rol que aparezca que no hay domiciliarios disponibles o algo asi
