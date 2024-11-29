const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuración de multer para recibir PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directorio donde se guardarán temporalmente los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Nombre único para cada archivo
  },
});

// Filtro para permitir solo PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false);
  }
};

const upload = multer({ storage, fileFilter });

const gestionPDF = async (req) => {
  const filePath = req.file.path;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Para subir archivos no multimedia
      public_id: `categorias/${req.file.filename}`,
    });

    // Elimina el archivo temporal de la carpeta local
    fs.unlinkSync(filePath);

    return result.secure_url; // Devuelve la URL pública
  } catch (error) {
    console.error("Error al subir archivo a Cloudinary:", error);
    throw new Error("Error al procesar el archivo PDF");
  }
};

module.exports = { upload, gestionPDF };