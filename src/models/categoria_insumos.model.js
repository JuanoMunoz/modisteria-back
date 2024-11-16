const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Insumo } = require('./insumo.model.js');
const { Catalogo } = require('./catalogo.model.js');

const CategoriaInsumos = sequelize.define('Categoria_Insumos',
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
      type: DataTypes.ENUM('Controlado', 'No controlado'),
      allowNull: false,
    },
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  },
  {
    tableName: 'categoria_insumos',
    timestamps: false,
  },
);

//Relacion categoria e insumo
CategoriaInsumos.hasMany(Insumo, {foreignKey: 'categoriaInsumoId', sourceKey: 'id', as: 'insumos'});
Insumo.belongsTo(CategoriaInsumos, {foreignKey: 'categoriaInsumoId', targetKey: 'id', as: 'categoria_insumos'});

//Relacion categoria y catalogo
CategoriaInsumos.hasMany(Catalogo, {foreignKey: 'categoriaId', sourceKey: 'id', as: 'catalogo'});
Catalogo.belongsTo(CategoriaInsumos, {foreignKey: 'categoriaId', targetKey: 'id', as: 'categoria_insumos'});


module.exports = { CategoriaInsumos };