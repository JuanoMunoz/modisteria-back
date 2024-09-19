const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const PQRS = sequelize.define('PQRS', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    domicilioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usuarioId: {
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

module.exports = { PQRS };
