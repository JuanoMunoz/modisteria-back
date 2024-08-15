const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

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
  },
  {
    timestamps: false,
  },
);

//Relacion cita y prenda


module.exports = { Cita };