const {Verificacion} = require('../models')
const {Op} = require("sequelize");

exports.createVerify = async(verificacion)=>{
    return await Verificacion.create(verificacion);
}
exports.getCodigoByEmail = async (email) => {
    try {
        const verification = await Verificacion.findOne({where: { email: email },attributes: ['codigo'] });
        return verification ? verification.codigo : null;
    } catch (error) {
        throw error;
    }
};