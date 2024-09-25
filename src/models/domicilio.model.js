const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { PQRS } = require('./pqrs.model.js');

const Domicilio = sequelize.define('Domicilio',
  {
    novedades: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
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

//Relacion domicilio y pqrs
Domicilio.hasMany(PQRS, {foreignKey:'domicilioId', sourceKey:'id', as:"pqrs"})
PQRS.belongsTo(Domicilio, {foreignKey:'domicilioId', sourceKey:'id', as:'domicilio'})


module.exports = { Domicilio };