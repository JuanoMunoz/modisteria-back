const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Catalogo } = require('./catalogo.model.js');

const Talla = sequelize.define('Talla',
  {
     nombre: {
       type: DataTypes.STRING,
       allowNull: false,
     }
  },
  {
    timestamps: false,
  },
);

Catalogo.hasMany(Talla, { foreignKey: 'tallaId', sourceKey: 'id', as: 'tallas' });
Talla.belongsTo(Catalogo, { foreignKey: 'catalogoId', targetKey: 'id', as: 'catalogo' });

module.exports = { Talla };

