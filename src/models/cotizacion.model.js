const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Venta } = require('./venta.model.js');
const { CotizacionPedidos } = require('./cotizacion_pedidos.model.js');

const Cotizacion = sequelize.define('Cotizacion', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombrePersona: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorDomicilio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    valorPrendas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    valorFinal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    metodoPago: {
        type: DataTypes.ENUM('efectivo', 'transferencia'),
        allowNull: false,
    },
    pedidoId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    tableName: 'Cotizaciones',
    timestamps: false,
});

//Relacion venta y cotizacion
Cotizacion.hasMany(Venta, { foreignKey: 'cotizacionId', as: 'ventas' });
Venta.belongsTo(Cotizacion, { foreignKey: 'cotizacionId', as: 'cotizacion' });

Cotizacion.hasMany(CotizacionPedidos, {foreignKey: 'cotizacionId', sourceKey: 'id', as: 'cotizacion_pedidos'});
CotizacionPedidos.belongsTo(Cotizacion, {foreignKey: 'cotizacionId', targetKey: 'id', as: 'cotizacion'});


module.exports = { Cotizacion };

