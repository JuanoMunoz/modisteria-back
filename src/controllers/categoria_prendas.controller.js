const {
  getAllCategoriaPrendas,
  getCategoriaPrendaById,
  createCategoriaPrenda,
  updateCategoriaPrenda,
  deleteCategoriaPrenda,
  statusCategoriaPrenda,
} = require("../repositories/categoria_prendas.repository");
const { gestionPDF, getPublicIdFromUrl } = require("../utils/pdf");
const cloudinary = require('cloudinary').v2;

exports.getAllCategoriaPrendas = async (req, res) => {
  try {
    const type = req.query.type || false;

    const categorias = await getAllCategoriaPrendas(type);
    res.status(200).json(categorias);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getCategoriaPrendaById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const categoria = await getCategoriaPrendaById(id);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createCategoriaPrenda = async (req, res) => {
  const categoria = req.body;

  try {
    console.log(req.body);
    await createCategoriaPrenda(categoria);
    res.status(201).json({ msg: "categoria creada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// exports.createCategoriaPrenda = async (req, res) => {
//   try {
//     let moldeUrl = null;
//     if (req.file) {
//       moldeUrl = await gestionPDF(req); // Obtener la URL con el parámetro 'attachment'
//       console.log('Archivo PDF subido a Cloudinary:', moldeUrl);
//     }

//     // Crear la categoría con la URL del PDF
//     const nuevaCategoria = await createCategoriaPrenda({
//       nombre: req.body.nombre,
//       descripcion: req.body.descripcion,
//       estadoId: req.body.estadoId,
//       molde: moldeUrl,  // Guarda la URL con el parámetro de descarga
//     });

//     res.status(200).json(nuevaCategoria); // Devuelve la nueva categoría creada
//   } catch (error) {
//     console.error("Error al crear la categoría:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  const categoria = req.body;

  try {
    await updateCategoriaPrenda(id, categoria);
    res.status(201).json({ msg: "categoria actualizada exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.statusCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  try {
    await statusCategoriaPrenda(id);
    res.status(201).json({ msg: "categoria inactiva" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategoriaPrenda(id);
    res.status(201).json({ msg: "categoria eliminada" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// exports.descargarMolde = async (req, res) => {
//   const { id } = req.params;
//   const categoria = await getCategoriaPrendaById(id);
//   const publicId = await getPublicIdFromUrl(categoria.molde);

//   try {
//     const result = await cloudinary.api.resource(publicId, { resource_type: 'raw' });

//     // Obtener el archivo binario
//     const fileBuffer = await fetch(result.secure_url);
//     const buffer = await fileBuffer.buffer();

//     res.setHeader('Content-Disposition', 'attachment; filename=molde.pdf');
//     res.setHeader('Content-Type', 'application/pdf');
//     res.send(buffer);
//   } catch (error) {
//     console.error("Error al descargar el archivo:", error);
//     res.status(500).json({ error: "Error al descargar el archivo" });
//   }
// };