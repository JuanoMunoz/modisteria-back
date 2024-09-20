const {Verificacion} = require('../models')
const {Op} = require("sequelize");

exports.createVerify = async(verificacion)=>{
    return await Verificacion.create(verificacion);
}
