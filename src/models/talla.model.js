const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection.js");
const { Catalogo } = require("./catalogo.model.js");
const { Pedido } = require("./pedido.model.js");

const Talla = sequelize.define(
  "Talla",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Catalogo.belongsToMany(Talla, { through: "CatalogoTalla" });
Talla.belongsToMany(Catalogo, { through: "CatalogoTalla" });
Pedido.hasMany(Talla, { foreignKey: "tallaId", sourceKey: "id", as: "tallas" });
Talla.belongsTo(Pedido, {
  foreignKey: "catalogoId",
  targetKey: "id",
  as: "pedido",
});

module.exports = { Talla };
