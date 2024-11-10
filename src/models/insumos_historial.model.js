const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Insumo } = require('./insumo.model.js');

const InsumoHistorial = sequelize.define('InsumoHistorial', {
    insumo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Insumos',
            key: 'id'
        }
    },
    cantidad_modificada: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'insumos_historial',
    timestamps: false
});

Insumo.hasMany(InsumoHistorial, { foreignKey: 'insumo_id', as: 'insumos' });
InsumoHistorial.belongsTo(Insumo, { foreignKey: 'insumo_id', as: 'insumos' });

module.exports = { InsumoHistorial };
