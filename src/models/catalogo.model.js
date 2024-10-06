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
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tallaId: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
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


module.exports = { Catalogo };

