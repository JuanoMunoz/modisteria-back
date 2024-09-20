const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Estado = sequelize.define('Estado', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
});

//Relacion 

module.exports = { Estado };
