const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Venta } = require('./venta.model.js');

const Cita = sequelize.define('Cita',
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    metodo_pago: {
      type: DataTypes.ENUM('transferencia', 'efectivo'),
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
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

//Relacion cita y carrito (pedido)
Cita.hasOne(Venta, { foreignKey: 'citaId' });
Venta.belongsTo(Cita, { foreignKey: 'citaId' });

module.exports = { Cita };