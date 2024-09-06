const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, getCatalogoByCategoria } = require("../repositories/catalogo.repository");
const { helperImg, uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } = require('../utils/image.js');
const fs = require('fs');
const path = require('path');

exports.getAllCatalogo = async (req, res) => {
  try {
    const catalogo = await getAllCatalogo();
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
        res.status(200).json(insumos);
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

        const { producto, precio, descripcion, talla, insumoId, categoriaId } = req.body;

        // Procesar las tallas
        const tallasProcesadas = req.body.talla.split(',').map(t => t.trim().toLowerCase());

        // Procesar la imagen desde el buffer de Multer
        const processedBuffer = await helperImg(req.file.buffer, 300);

        // Subir la imagen procesada a Cloudinary
        const result = await uploadToCloudinary(processedBuffer);

        // Crear el catálogo con la URL de la imagen
        const newCatalogo = {
            producto,
            precio,
            descripcion,
            talla: tallasProcesadas,
            insumoId,
            categoriaId,
            imagen: result.url  // URL de la imagen subida a Cloudinary
        };

        await createCatalogo(newCatalogo);
        res.status(201).json({ msg: 'Catálogo creado exitosamente' });

    } catch (error) {
        console.error(`Error en createCatalogo: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al crear el catálogo' });
    }
};

exports.updateCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, precio, descripcion, talla, insumoId, categoriaId } = req.body;

        const tallasProcesadas = req.body.talla.split(',').map(t => t.trim().toLowerCase());

        // Obtener el catálogo existente para acceder a la imagen previa
        const existingCatalogo = await getCatalogoById(id);

        let newImageUrl = existingCatalogo.imagen;  // Mantener la URL de la imagen actual si no hay nueva imagen

        if (req.file) {
            // Procesar la nueva imagen si se sube
            const processedBuffer = await helperImg(req.file.buffer, 300);

            // Subir la nueva imagen a Cloudinary
            const result = await uploadToCloudinary(processedBuffer);
            newImageUrl = result.url;  // Actualizar la URL de la imagen

            // Eliminar la imagen previa de Cloudinary si existe
            if (existingCatalogo.imagen) {
                const publicId = getPublicIdFromUrl(existingCatalogo.imagen); // Extraer el public_id de la imagen anterior
                await deleteFromCloudinary(publicId);  // Eliminar la imagen previa
            }
        }

        // Actualizar el catálogo con los nuevos datos y la nueva URL de la imagen
        const updatedCatalogo = {
            producto,
            precio,
            descripcion,
            talla: tallasProcesadas,
            insumoId,
            categoriaId,
            imagen: newImageUrl  // Nueva URL de la imagen (o la misma si no se cambió)
        };

        await updateCatalogo(id, updatedCatalogo);
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
        res.status(201).json({msg: 'catalogo inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCatalogo(id);
        res.status(201).json({msg: 'catalogo eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}