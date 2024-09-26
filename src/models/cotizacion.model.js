const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Venta } = require('./venta.model.js');

const Cotizacion = sequelize.define('Cotizacion', {
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombrePersona: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorDomicilio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    valorPrendas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    valorFinal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    tableName: 'Cotizaciones',
    timestamps: false,
});

//Relacion venta y cotizacion
Cotizacion.hasMany(Venta, { foreignKey: 'cotizacionId', as: 'ventas' });
Venta.belongsTo(Cotizacion, { foreignKey: 'cotizacionId', as: 'cotizacion' });

module.exports = { Cotizacion };

