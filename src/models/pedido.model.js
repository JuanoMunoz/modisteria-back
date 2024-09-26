const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Venta } = require('./venta.model.js');
const { Domicilio } = require('./domicilio.model.js');
const { Cotizacion } = require('./cotizacion.model.js');
const {Catalogo} = require('./catalogo.model.js');
const { CotizacionPedidos } = require('./cotizacion_pedidos.model.js');


const Pedido = sequelize.define('Pedido',
  {
    idPedido: {
    type: DataTypes.UUID,
    allowNull: false,
    autoIncrement: false,
  },
    catalogoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioFinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    usuarioId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false,
  },
);

Pedido.hasMany(CotizacionPedidos, {foreignKey: 'pedidoId', sourceKey: 'id', as: 'cotizacion_pedidos'});
CotizacionPedidos.belongsTo(Pedido, {foreignKey: 'pedidoId', targetKey: 'id', as: 'pedido'});

Pedido.belongsTo(Catalogo, { foreignKey: 'catalogoId', as: 'catalogo' });
Catalogo.hasMany(Pedido, { foreignKey: 'catalogoId', as: 'pedidos' });

module.exports = { Pedido };