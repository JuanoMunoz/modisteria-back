const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Insumo = sequelize.define('Insumo', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoriaId: {
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

module.exports = { Insumo };
