const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Catalogo } = require('./catalogo.model.js');
const { Prenda } = require('./prenda.model.js');

const Insumo = sequelize.define('Insumo',
  {
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
  },
  {
    timestamps: false,
  },
);

// Relacion insumo y catalogo
Insumo.hasMany(Catalogo, {foreignKey: 'insumoId', sourceKey: 'id', as: 'catalogo'});
Catalogo.belongsTo(Insumo, {foreignKey: 'insumoId', targetKey: 'id', as: 'insumos'});

//Relacion insumo y prenda
Insumo.belongsToMany(Prenda, { through: 'Insumos_Prendas' });
Prenda.belongsToMany(Insumo, { through: 'Insumos_Prendas' });

module.exports = { Insumo };