const { Insumo } = require("../models/insumo.model.js");
const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, getCatalogoByCategoria } = require("../repositories/catalogo.repository");
const { helperImg, uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } = require('../utils/image.js');
const { createCatalogoInsumos } = require("./catalogo_insumo.contoller.js");

exports.getAllCatalogo = async (req, res) => {
    try {
        const priceLimit = parseInt(req.query.price) || 250000
        const limit = parseInt(req.query.limit) || 9
        const page = parseInt(req.query.page) || 1
        const category = parseInt(req.query.category) || false
        const offset = (page - 1) * limit
        const catalogo = await getAllCatalogo(offset, limit, priceLimit,category);
        res.status(200).json(catalogo);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.getCatalogoById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const catalogo = await getCatalogoById(id);
        res.status(200).json(catalogo);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.getCatalogoByCategoria = async (req, res) => {
    const { categoriaId } = req.params;
    try {
        const catalogo = await getCatalogoByCategoria(categoriaId);
        if (catalogo.length === 0) {
            return res.status(404).json({ error: 'No se encontraron prendas en el catalogo para esta categoría' });
        }
        res.status(200).json(catalogo);
    } catch (error) {
        console.error('Error al obtener catalogo:', error);
        res.status(500).json({ error: 'Error al obtener los catalogo', details: error.message });
    }
};

exports.createCatalogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { producto, precio, descripcion, tallaId, categoriaId, estadoId } = req.body;
        const tallasProcesadas = Array.isArray(tallaId) ? tallaId : tallaId.split(',').map(t => parseInt(t.trim(), 10));
        const processedBuffer = await helperImg(req.file.buffer, 300);
        const result = await uploadToCloudinary(processedBuffer);

        const insumoIds = parsedInsumos.map(insumo => insumo.insumo_id);
        const cantidadesUtilizadas = parsedInsumos.map(insumo => insumo.cantidad_utilizada);

        const insumosDisponibles = await Insumo.findAll({
            where: {
                id: insumoIds
            }
        });

        let stock = null;
        insumosDisponibles.forEach((insumo, index) => {
            const cantidadUtilizada = cantidadesUtilizadas[index];
            const cantidadDisponible = insumo.cantidad;
            const stockPorInsumo = Math.floor(cantidadDisponible / cantidadUtilizada);

            if (stock === null || stockPorInsumo < stock) {
                stock = stockPorInsumo;
            }
        });

        const newCatalogo = {
            producto,
            precio,
            descripcion,
            tallaId: tallasProcesadas,
            categoriaId,
            imagen: result.url,
            estadoId,
            stock: stock
        };
        const catalogoCreado = await createCatalogo(newCatalogo);

        const datosInsumos = parsedInsumos.map(insumo => ({
            insumo_id: insumo.insumo_id,
            cantidad_utilizada: insumo.cantidad_utilizada
        }));

        await createCatalogoInsumos({
            body: {
                catalogoId: catalogoCreado.id,
                datosInsumos
            }
        }, res);

    } catch (error) {
        console.error(`Error en createCatalogo: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al crear el catálogo' });
    }
};


exports.updateCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, precio, descripcion, tallaId, categoriaId, estadoId } = req.body;

        const existingCatalogo = await getCatalogoById(id);

        let tallasProcesadas;
        if (Array.isArray(tallaId)) {
            tallasProcesadas = tallaId.map(t => parseInt(t, 10));
        } else {
            return res.status(400).json({ success: false, message: 'Las tallas deben ser un array de números.' });
        }

        const updatedCatalogo = {
            producto: producto || existingCatalogo.producto,
            precio: precio || existingCatalogo.precio,
            descripcion: descripcion || existingCatalogo.descripcion,
            talla: tallasProcesadas || existingCatalogo.talla,
            categoriaId: categoriaId || existingCatalogo.categoriaId,
            imagen: existingCatalogo.imagen,
            estadoId: estadoId || existingCatalogo.estadoId
        };

        // Procesar la imagen si se carga una nueva
        if (req.file) {
            const processedBuffer = await helperImg(req.file.buffer, 300);
            const result = await uploadToCloudinary(processedBuffer);
            updatedCatalogo.imagen = result.url;

            // Eliminar la imagen anterior de Cloudinary
            if (existingCatalogo.imagen) {
                const publicId = getPublicIdFromUrl(existingCatalogo.imagen);
                await deleteFromCloudinary(publicId);
            }
        }

        const updateResult = await updateCatalogo(id, updatedCatalogo);
        res.status(200).json({ msg: 'Catálogo actualizado exitosamente' });
    } catch (error) {
        console.error(`Error en updateCatalogo: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al actualizar el catálogo' });
    }
};


exports.statusCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        await statusCatalogo(id);
        res.status(201).json({ msg: 'catalogo inactivo' });
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCatalogo(id);
        res.status(201).json({ msg: 'catalogo eliminado' });
    } catch (error) {
        res.status(500).json(error);
    }
}