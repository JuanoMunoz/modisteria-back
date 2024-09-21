const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Usuario } = require('./usuario.model.js');
const { RolesPermisos } = require('./roles_permisos.model.js');

const Role = sequelize.define('Role',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permisosId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
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

Role.hasMany(Usuario, {foreignKey: 'roleId', sourceKey: 'id', as: 'usuarios'});
Usuario.belongsTo(Role, {foreignKey: 'roleId', targetKey: 'id', as: 'role'});

Role.hasMany(RolesPermisos, {foreignKey: 'roleId', sourceKey: 'id', as: 'roles_permisos'});
RolesPermisos.belongsTo(Role, {foreignKey: 'roleId', targetKey: 'id', as: 'role'});

module.exports = { Role };