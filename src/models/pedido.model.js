const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');


const Pedido = sequelize.define('Pedido',
  {
    catalogoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioFinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    usuarioId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false,
  },
);



module.exports = { Pedido };