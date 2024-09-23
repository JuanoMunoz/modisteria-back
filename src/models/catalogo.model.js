const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection.js');


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


module.exports = { Catalogo };

