const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Usuario } = require('./usuario.model.js');

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
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  },
  {
    timestamps: false,
  },
);

Role.hasMany(Usuario, {foreignKey: 'roleId', sourceKey: 'id', as: 'usuarios'});
Usuario.belongsTo(Role, {foreignKey: 'roleId', targetKey: 'id', as: 'role'});


module.exports = { Role };