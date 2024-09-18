const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Domicilio = sequelize.define('Domicilio',
  {
    novedades: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pedidoId: {
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
  },
  {
    timestamps: false,
  },
);

module.exports = { Domicilio };