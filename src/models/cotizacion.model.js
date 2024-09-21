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
    carritoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: false,
});

module.exports = { Cotizacion };

