const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');

const Cita = sequelize.define('Cita',
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tiempo:{
      type:DataTypes.TIME,
      allowNull:true
    },
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = { Cita };


/*
TRIGGER EN POSTGRESQL

CREATE OR REPLACE FUNCTION eliminar_cita_no_aceptada()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estadoId = 10 THEN
        IF NEW.fecha <= NOW() + INTERVAL '1 day' THEN
            DELETE FROM "Citas" WHERE id = NEW.id;
        END IF;
    END IF;
    RETURN NULL; 
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER verificar_cita_estado
AFTER UPDATE OF "estadoId"
ON "Cita"
FOR EACH ROW
WHEN (NEW."estadoId" = 10)
EXECUTE FUNCTION eliminar_cita_no_aceptada();

*/