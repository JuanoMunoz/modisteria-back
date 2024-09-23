const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Role } = require('./role.model.js');

const Permiso = sequelize.define('Permiso',
  {
     nombre: {
       type: DataTypes.STRING,
       allowNull: false,
     },
    descripcion: {
      type: DataTypes.STRING,
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

Permiso.belongsToMany(Role, { through: 'Roles_Permisos' });
Role.belongsToMany(Permiso, { through: 'Roles_Permisos' });


module.exports = { Permiso };