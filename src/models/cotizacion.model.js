const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Cotizacion = sequelize.define('Cotizacion', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
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
    pedidoId: {
        type: DataTypes.INTEGER,
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

//Relación cotizacion y venta

module.exports = { Cotizacion };

