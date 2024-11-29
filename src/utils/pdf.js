// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;

// // Configuración de Multer para manejar archivos PDF
// const storage = multer.memoryStorage();

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
//     fileFilter: function (req, file, cb) {
//       if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//       } else {
//         cb(new Error('Solo se permiten archivos PDF'), false);
//       }
//     }
//   });
  

// // Función para subir archivos a Cloudinary
// async function uploadToCloudinary(buffer) {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//             {
//                 resource_type: 'raw',  // Indicar que el archivo es de tipo "raw" para no tratarlo como imagen
//             },
//             (error, result) => {
//                 if (error) {
//                     console.error('Error subiendo archivo a Cloudinary:', error);
//                     return reject(error);
//                 }
//                 resolve(result);
//             }
//         ).end(buffer);
//     });
// }

// // Función para eliminar archivo de Cloudinary
// async function deleteFromCloudinary(publicId) {
//     try {
//         await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
//     } catch (error) {
//         console.error(`Error eliminando el archivo de Cloudinary: ${error.message}`);
//         throw error;
//     }
// }

// // Función para obtener el public_id de un archivo
// function getPublicIdFromUrl(url) {
//     const parts = url.split('/');
//     const publicIdWithExtension = parts[parts.length - 1];
//     const publicId = publicIdWithExtension.split('.')[0];
//     return publicId;
// }

// // Función para gestionar la carga y descarga del PDF
// async function gestionPDF(req) {
//     if (!req.file) {
//       throw new Error("Se requiere un archivo PDF para la carga.");
//     }
  
//     try {
//       // Subir el archivo PDF a Cloudinary
//       const result = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { resource_type: "raw" }, // Indicar que es un archivo "raw"
//           (error, uploadResult) => {
//             if (error) {
//               console.error('Error subiendo el archivo a Cloudinary:', error);
//               return reject(error);
//             }
//             resolve(uploadResult); // Devolver el resultado de la carga
//           }
//         );
//         // Enviar el archivo desde la memoria al flujo de carga de Cloudinary
//         uploadStream.end(req.file.buffer);
//       });
  
//       // Devolver la URL de descarga del archivo
//       return result.secure_url;
//     } catch (error) {
//       console.error('Error al gestionar el archivo PDF:', error);
//       throw new Error('Error al gestionar el archivo PDF');
//     }
//   }
  
// module.exports = {
//     upload,
//     uploadToCloudinary,
//     deleteFromCloudinary,
//     getPublicIdFromUrl,
//     gestionPDF,
// };

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

// Configurar CORS
app.use(cors({ origin: "http://localhost:5173" })); // Cambiar según el origen del frontend

// Carpeta donde se guardarán los archivos
const UPLOADS_DIR = path.join(__dirname, "moldes");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta para manejar la subida de archivos
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se envió ningún archivo.");
  }

  // URL de descarga
  const fileUrl = `http://localhost:4000/uploads/${req.file.filename}`;
  res.json({ message: "Archivo subido exitosamente.", downloadUrl: fileUrl });
});

// Servir los archivos de la carpeta uploads
app.use("/uploads", express.static(UPLOADS_DIR));
