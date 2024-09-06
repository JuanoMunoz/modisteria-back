const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Catalogo = sequelize.define('Catalogo',
  {
    producto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    talla: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    insumoId: {
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
  },
  {
    timestamps: false,
  },
);

module.exports = { Catalogo };