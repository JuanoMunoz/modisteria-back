const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Domicilio } = require('./domicilio.model.js');

const Venta = sequelize.define('Venta', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cotizacionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});


module.exports = { Venta };
