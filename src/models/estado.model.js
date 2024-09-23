const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Usuario, Permiso, Role, Domicilio, Cita, Venta, Catalogo, Categoria, Insumo} = require('../models');


const Estado = sequelize.define('Estado',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  },
);
module.exports = { Estado };

//Relación de usuario a estados
Usuario.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Usuario, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

//Relación de permiso a estados
Permiso.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Permiso, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

//Relación de roles a estados
Role.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Role, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

//Relación de domicilios a estados
Domicilio.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Domicilio, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

//Relación de citas a estados
Cita.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Cita, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

/* //Relación de ventas a estados
Venta.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Venta, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'}); */

//Relación de catalogo a estados
Catalogo.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Catalogo, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

//Relación de categoria a estados
Categoria.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Categoria, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});

//Relación de Insumos a estados
Insumo.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Insumo, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'});



