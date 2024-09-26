const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const CotizacionPedidos = sequelize.define('CotizacionPedidos', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    cotizacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cotizacion_pedidos',
    timestamps: false
});

module.exports = { CotizacionPedidos };
