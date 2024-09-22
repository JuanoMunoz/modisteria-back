require('dotenv').config(); 
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.CONNECT_DB, {
  dialect: process.env.DIALECT_DB || 'postgres',
});

const connection = async () => {
  // const { Usuario, Role } = require("../models");
  try {
    await sequelize.authenticate();
    // await User.sync({ force: false, alter: true });
    // await Role.sync({ force: false, alter: true });
    await sequelize.sync({alter: false}); 
    console.log("Se sincronizo de manera correcta");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {connection, sequelize};
