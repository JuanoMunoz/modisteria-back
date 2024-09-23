const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const {Pedido} = require('./pedido.model.js')

const Catalogo = sequelize.define('Catalogo', {
    producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    talla: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

//Relación catálogo a pedido
Pedido.hasMany(Catalogo, {foreignKey:'catalogoId', sourceKey:'id', as:'catalogo'})
Catalogo.belongsTo(Pedido, {foreignKey:'catalogoId', sourceKey:'id', as:'cedido'})

module.exports = { Catalogo };

