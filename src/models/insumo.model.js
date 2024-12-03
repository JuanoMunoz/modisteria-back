const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");
const { Compras } = require("./compras.model.js");

const Insumo = sequelize.define(
  "Insumo",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoriaInsumoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unidadMedidaId: {
      type: DataTypes.INTEGER,
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
Compras.belongsTo(Insumo, {foreignKey: "insumoId",as: "insumo",});
Insumo.hasMany(Compras, { foreignKey: "insumoId", as: "compras" });
module.exports = { Insumo };
