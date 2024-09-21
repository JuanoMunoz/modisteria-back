const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Venta = sequelize.define('Venta', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    valorDomicilio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valorPrendas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valorFinal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    carritoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    citaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: false,
});

module.exports = { Venta };
