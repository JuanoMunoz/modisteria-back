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
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  },
);

Permiso.belongsToMany(Role, { through: 'Roles_Permisos' });
Role.belongsToMany(Permiso, { through: 'Roles_Permisos' });


module.exports = { Permiso };