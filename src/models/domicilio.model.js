const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { PQRS } = require('./pqrs.model.js');
const { Venta } = require('./venta.model.js');

const Domicilio = sequelize.define('Domicilio',
  {
    novedades: {
      type: DataTypes.STRING,
      allowNull: true,
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

//Relacion domicilio y venta
Venta.hasMany(Domicilio, { foreignKey: 'ventaId', as: 'domicilio' });
Domicilio.belongsTo(Venta, { foreignKey: 'ventaId', as: 'ventas' });

module.exports = { Domicilio };