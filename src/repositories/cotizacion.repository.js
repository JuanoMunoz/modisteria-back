// const { sequelize } = require("../database/connection");
const { Cotizacion } = require("../models");

exports.getAllCotizaciones = async () => {
    return await Cotizacion.findAll();
};

exports.getCotizacionById = async (id) => {
    return await Cotizacion.findByPk(id);
}

exports.createCotizacion = async (cotizacion) => {
    return await Cotizacion.create(cotizacion);
}

exports.updateCotizacion = async (id, cotizacion) => {
    return await Cotizacion.update(cotizacion, { where: { id } });
}

exports.statusCotizacion = async (id) => {
    return await Cotizacion.update({ estado: false }, { where: { id } });
}
exports.deleteCotizacion = async (id) => {
    return await Cotizacion.destroy({ where: { id } });
}

// exports.deleteCotizacion = async (id) => {
//     const t = await sequelize.transaction();

//     try {
//         const result = await Cotizacion.destroy({ where: { id }, transaction: t });
        
//         if (result === 0) {
//             throw new Error('La cotización no existe o no puede ser eliminada.');
//         }

//         await t.commit();
//         return result;
//     } catch (error) {
//         await t.rollback();
//         console.error('Error al eliminar la cotización:', error);
//         throw new Error(`Error al eliminar la cotización: ${error.message}`);
//     }
// };
