const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { Catalogo } = require('./catalogo.model.js');
const { Insumo } = require('./insumo.model.js');

const CatalogoInsumos = sequelize.define('CatalogoInsumos', {
    cantidad_utilizada: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'catalogo_insumos',
    timestamps: false
});

// Definir las relaciones
Catalogo.belongsToMany(Insumo, { through: CatalogoInsumos, foreignKey: 'catalogo_id' });
Insumo.belongsToMany(Catalogo, { through: CatalogoInsumos, foreignKey: 'insumo_id' });

module.exports = { CatalogoInsumos };
