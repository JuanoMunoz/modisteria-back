const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { RolesPermisos } = require('./roles_permisos.model.js');

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

// Permiso.belongsToMany(Role, { through: 'Roles_Permisos' });
// Role.belongsToMany(Permiso, { through: 'Roles_Permisos' });

Permiso.hasMany(RolesPermisos, {foreignKey: 'roleId', sourceKey: 'id', as: 'roles_permisos'});
RolesPermisos.belongsTo(Permiso, {foreignKey: 'roleId', targetKey: 'id', as: 'permiso'});

module.exports = { Permiso };

