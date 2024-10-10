const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const {Usuario} = require('../models/usuario.model.js')
const {Permiso} = require('../models/permiso.model.js')
const {Role} = require('../models/role.model.js')
const {Domicilio} = require('../models/domicilio.model.js')
const {Cita} = require('../models/cita.model.js')
const {Venta} = require('../models/venta.model.js')
const {Catalogo} = require('../models/catalogo.model.js')
const {Categoria} = require('../models/categoria.model.js')
const {Insumo} = require('../models/insumo.model.js');
const { Pedido } = require('./pedido.model.js');


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
Usuario.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estadoUsuario' });
Estado.hasMany(Usuario, { foreignKey: 'estadoId', as: 'usuarios' });

//Relación de permiso a estados
Permiso.belongsTo(Estado, {foreignKey: 'estadoId', as: 'estadoPermisos'});
Estado.hasMany(Permiso, {foreignKey: 'estadoId', as: 'permisos'});

//Relación de roles a estados
Role.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoRoles'});
Estado.hasMany(Role, {foreignKey: 'estadoId', targetKey: 'id', as: 'roles'});

//Relación de domicilios a estados
Domicilio.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoDomicilio'});
Estado.hasMany(Domicilio, {foreignKey: 'estadoId', targetKey: 'id', as: 'domicilios'});

//Relación de citas a estados
Cita.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoCita'});
Estado.hasMany(Cita, {foreignKey: 'estadoId', targetKey: 'id', as: 'citas'});

//Relación de ventas a estados
Venta.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estado'});
Estado.hasMany(Venta, {foreignKey: 'estadoId', targetKey: 'id', as: 'usuario'}); 

//Relación de catalogo a estados
Catalogo.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoCatalogo'});
Estado.hasMany(Catalogo, {foreignKey: 'estadoId', targetKey: 'id', as: 'catalogos'});

//Relación de categoria a estados
Categoria.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoCategoria'});
Estado.hasMany(Categoria, {foreignKey: 'estadoId', targetKey: 'id', as: 'categorias'});

//Relación de Insumos a estados
Insumo.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoInsumo'});
Estado.hasMany(Insumo, {foreignKey: 'estadoId', targetKey: 'id', as: 'insumos'});

//Relación de Pedido a estados
Pedido.belongsTo(Estado, {foreignKey: 'estadoId', sourceKey: 'id', as: 'estadoPedido'});
Estado.hasMany(Pedido, {foreignKey: 'estadoId', targetKey: 'id', as: 'pedidos'});

