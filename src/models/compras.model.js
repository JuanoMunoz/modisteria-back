const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../database/connection.js");

const Compras = sequelize.define(
    "Compras",
    {
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        proveedorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = { Compras }; 
