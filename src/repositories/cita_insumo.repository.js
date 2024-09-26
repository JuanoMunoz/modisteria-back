const { CitaInsumo, Insumo } = require("../models");
const {getInsumoById} = require('../repositories/insumo.repository')

exports.getAllCitaInsumo = async () => {
    return await CitaInsumo.findAll();
};

exports.getCitaInsumoById = async (id) => {
    return await CitaInsumo.findByPk(id);
}

exports.createCitaInsumo = async (citaInsumo) => {
    return await CitaInsumo.create(citaInsumo);
}

exports.updateCitaInsumo = async (id, citaInsumo) => {
    return await CitaInsumo.update(citaInsumo, { where: { id } });
}

exports.statusCitaInsumo = async (id) => {
    return await CitaInsumo.update({ estado: false }, { where: { id } });
}
exports.deleteCitaInsumo = async (id) => {
    return await CitaInsumo.destroy( { where: { id } });
}

exports.discountInsumo = async(id, cantidad)=>{
    const insumo = await Insumo.getInsumoById(id)
    const cantidadI = insumo.cantidad
    const cantidadT = cantidadI - cantidad
    return await Insumo.update({cantidad:cantidadT}, {where:{id}})
}
