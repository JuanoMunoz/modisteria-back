const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, getCatalogoByCategoria } = require("../repositories/catalogo.repository");
const { helperImg, uploadToCloudinary } = require('../utils/image.js');
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

        const { producto, precio, descripcion, talla, categoriaId } = req.body;
        console.log(`Nombre del archivo: ${req.file.filename}`);

        // Procesar la imagen
        const processedFileName = `resize-${req.file.filename}`;
        await helperImg(req.file.path, processedFileName, 300);
        const processedFilePath = `./optimize/${processedFileName}`;

        console.log(`Archivo procesado en: ${processedFilePath}`);

        // Subir a Cloudinary
        const result = await uploadToCloudinary(processedFilePath);

        // Crear el catálogo con la URL de la imagen
        const newCatalogo = {
            producto,
            precio,
            descripcion,
            talla,
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
        const catalogo = req.body;
        await updateCatalogo(id, catalogo);
        res.status(201).json({msg: 'catalogo actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
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