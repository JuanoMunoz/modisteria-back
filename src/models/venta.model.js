const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Venta = sequelize.define('Venta', {
    fecha: {
        type: DataTypes.DATE,
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
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    citaId: {
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
