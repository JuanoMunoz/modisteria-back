const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Insumo = sequelize.define('Insumo', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('controlado', 'no controlado'),
        allowNull: false,
      },
}, {
    timestamps: false,
});

module.exports = { Insumo };
