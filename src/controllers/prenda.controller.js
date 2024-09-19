const { getAllPrendas, getPrendaById, createPrenda, updatePrenda, deletePrenda } = require("../repositories/prenda.repository");
const { helperImg, uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } = require('../utils/image.js');

exports.getAllPrendas = async (req, res) => {
  try {
    const prenda = await getAllPrendas();
    res.status(200).json(prenda);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getPrendaById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const prenda = await getPrendaById(id);
        res.status(200).json(prenda);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createPrenda = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { nombre, talla, cantidad, objetivo, citaId, categoriaId } = req.body;

        // Procesar las tallas
        const tallasProcesadas = req.body.talla.split(',').map(t => t.trim().toLowerCase());
        
        // Procesar la imagen desde el buffer de Multer
        const processedBuffer = await helperImg(req.file.buffer, 300);

        // Subir la imagen procesada a Cloudinary
        const result = await uploadToCloudinary(processedBuffer);

        // Crear el catálogo con la URL de la imagen
        const newPrenda = {
            nombre,
            talla: tallasProcesadas,
            imagen: result.url, // URL de la imagen subida a Cloudinary
            cantidad,
            objetivo,
            citaId,
            categoriaId,
        };

        await createPrenda(newPrenda);
        res.status(201).json({ msg: 'Prenda creada exitosamente' });

    } catch (error) {
        console.error(`Error en createPrenda: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al crear la prenda' });
    }
};

exports.updatePrenda = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, talla, cantidad, objetivo, citaId, categoriaId } = req.body;

        // Obtener el catálogo existente para acceder a la imagen previa
        const existingPrenda = await getPrendaById(id);

        // Procesar la talla si existe
        let tallasProcesadas;
        if (talla) {
            if (typeof talla === 'string') {
                tallasProcesadas = talla.split(',').map(t => t.trim().toLowerCase());
            } else {
                tallasProcesadas = talla.map(t => t.trim().toLowerCase());
            }
        }

        // Inicializar el objeto de actualización con los valores existentes o nuevos
        const updatedPrenda = {
            nombre: nombre || existingPrenda.nombre,
            talla: tallasProcesadas || existingPrenda.talla,
            imagen: existingPrenda.imagen,
            cantidad: cantidad || existingPrenda.cantidad,
            objetivo: objetivo || existingPrenda.objetivo,
            citaId: citaId || existingPrenda.citaId,
            categoriaId: categoriaId || existingPrenda.categoriaId,
        };

        if (req.file) {
            // Procesar la nueva imagen si se sube
            const processedBuffer = await helperImg(req.file.buffer, 300);

            // Subir la nueva imagen a Cloudinary
            const result = await uploadToCloudinary(processedBuffer);
            updatedCatalogo.imagen = result.url;  // Actualizar la URL de la imagen

            // Eliminar la imagen previa de Cloudinary si existe
            if (existingPrenda.imagen) {
                const publicId = getPublicIdFromUrl(existingPrenda.imagen); // Extraer el public_id de la imagen anterior
                await deleteFromCloudinary(publicId);  // Eliminar la imagen previa
            }
        }

        // Actualizar el catálogo con los nuevos datos
        const updateResult = await updatePrenda(id, updatedPrenda);

        res.status(200).json({ msg: 'Prenda actualizada exitosamente' });
    } catch (error) {
        console.error(`Error en updatePrenda: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al actualizar la prenda' });
    }
};

exports.statusPrenda = async (req, res) => {
    const { id } = req.params;

    try {
        await statusPrenda(id);
        res.status(201).json({msg: 'prenda inactiva'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deletePrenda = async (req, res) => {
    const { id } = req.params;

    try {
        await deletePrenda(id);
        res.status(201).json({msg: 'prenda eliminada'});
    } catch (error) {
        res.status(500).json(error);
    }
}