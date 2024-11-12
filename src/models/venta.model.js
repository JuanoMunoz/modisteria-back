const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Venta = sequelize.define('Venta', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombrePersona: {
        type: DataTypes.STRING,
        allowNull: true,
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
    metodoPago: {
        type: DataTypes.ENUM('transferencia'),
        allowNull: false,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    citaId:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
}, {
    timestamps: false,
});

// Cotizacion.hasMany(Venta, { foreignKey: 'cotizacionId', as: 'ventas' });
// Venta.belongsTo(Cotizacion, { foreignKey: 'cotizacionId', as: 'cotizacion' });


module.exports = { Venta };
