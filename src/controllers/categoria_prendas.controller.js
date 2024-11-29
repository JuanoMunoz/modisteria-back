const {
  getAllCategoriaPrendas,
  getCategoriaPrendaById,
  createCategoriaPrenda,
  updateCategoriaPrenda,
  deleteCategoriaPrenda,
  statusCategoriaPrenda,
} = require("../repositories/categoria_prendas.repository");
const { getPublicIdFromUrl } = require("../utils/image");
const {  gestionPDF } = require("../utils/pdf");
const multer = require("multer");
const upload = multer({ dest: "../utils/uploads/" });

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

// exports.createCategoriaPrenda = async (req, res) => {
//   const categoria = req.body;

//   try {
//     console.log(req.body);
//     await createCategoriaPrenda(categoria);
//     res.status(201).json({ msg: "categoria creada exitosamente" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: error.message });
//   }
// };

exports.createCategoriaPrenda = async (req, res) => {
  const { nombre, descripcion, estadoId } = req.body;
  let moldeUrl = null;

  try {
    // Si hay un archivo, procesarlo y subirlo (local o Cloudinary)
    if (req.file) {
      moldeUrl = await gestionPDF(req); // Sube el archivo a Cloudinary y obtiene la URL
    }

    // Crear la nueva categoría con la URL del PDF
    const nuevaCategoria = await createCategoriaPrenda({
      nombre,
      descripcion,
      estadoId,
      molde: moldeUrl, // Guarda la URL del archivo en la base de datos
    });

    res.status(201).json({ msg: "Categoría creada exitosamente", nuevaCategoria });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: error.message });
  }
};


// exports.updateCategoriaPrenda = async (req, res) => {
//   const { id } = req.params;
//   const categoria = req.body;

//   try {
//     await updateCategoriaPrenda(id, categoria);
//     res.status(201).json({ msg: "categoria actualizada exitosamente" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateCategoriaPrenda = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estadoId } = req.body;
  let moldeUrl = null;

  try {
    // Obtener la categoría existente
    const categoriaExistente = await getCategoriaPrendaById(id);

    if (!categoriaExistente) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    // Si se sube un nuevo archivo, reemplazarlo
    if (req.file) {
      // Eliminar el archivo anterior de Cloudinary si existe
      if (categoriaExistente.molde) {
        const publicId = getPublicIdFromUrl(categoriaExistente.molde);
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      }

      // Subir el nuevo archivo
      moldeUrl = await gestionPDF(req);
    } else {
      // Mantener el archivo existente si no se sube uno nuevo
      moldeUrl = categoriaExistente.molde;
    }

    // Actualizar la categoría
    await updateCategoriaPrenda(id, {
      nombre,
      descripcion,
      estadoId,
      molde: moldeUrl,
    });

    res.status(200).json({ msg: "Categoría actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ error: error.message });
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