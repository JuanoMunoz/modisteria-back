const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Insumo } = require('./insumo.model.js');
const { Catalogo } = require('./catalogo.model.js');

const Categoria = sequelize.define('Categorias',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('insumo', 'prenda'),
      allowNull: false,
    },
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  },
  {
    timestamps: false,
  },
);

//Relacion categoria e insumo
Categoria.hasMany(Insumo, {foreignKey: 'categoriaId', sourceKey: 'id', as: 'insumos'});
Insumo.belongsTo(Categoria, {foreignKey: 'categoriaId', targetKey: 'id', as: 'categorias'});

//Relacion categoria y catalogo
Categoria.hasMany(Catalogo, {foreignKey: 'categoriaId', sourceKey: 'id', as: 'catalogo'});
Catalogo.belongsTo(Categoria, {foreignKey: 'categoriaId', targetKey: 'id', as: 'categorias'});



module.exports = { Categoria };