const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");

const Proveedor = sequelize.define(
    "Proveedor",
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = { Proveedor };
