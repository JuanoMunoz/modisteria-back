const { Talla } = require("../models");

exports.getAllTallas = async () => {
    return await Talla.findAll();
};

exports.getTallaById = async (id) => {
    return await Talla.findByPk(id);
}

exports.createTalla = async (talla) => {
    return await Talla.create(talla);
}

exports.updateTalla = async (id, talla) => {
    return await Talla.update(talla, { where: { id } });
}

exports.statusTalla = async (id) => {
    return await Talla.update({ estado: false }, { where: { id } });
}

exports.deleteTalla = async (id) => {
    const talla = await Talla.findByPk(id);
    
    if (!talla) {
        throw new Error("Talla no encontrada");
    }

    // const existeEnRolesPermisos = await RolesPermisos.findOne({ where: { permisoId: id } });
    
    // if (existeEnRolesPermisos) {
    //     throw new Error("No se puede eliminar el permiso porque está asociado a un rol");
    // }
}
