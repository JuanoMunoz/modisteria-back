const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configuración de Multer para manejar archivos PDF
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Asegurarse de que solo los archivos PDF sean aceptados
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF'), false);
        }
    }
});

// Función para subir archivos a Cloudinary
async function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',  // Indicar que el archivo es de tipo "raw" para no tratarlo como imagen
            },
            (error, result) => {
                if (error) {
                    console.error('Error subiendo archivo a Cloudinary:', error);
                    return reject(error);
                }
                resolve(result);
            }
        ).end(buffer);
    });
}

// Función para eliminar archivo de Cloudinary
async function deleteFromCloudinary(publicId) {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    } catch (error) {
        console.error(`Error eliminando el archivo de Cloudinary: ${error.message}`);
        throw error;
    }
}

// Función para obtener el public_id de un archivo
function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
}

async function gestionPDF(req) {
    if (!req.file) {
      throw new Error("Se requiere un archivo PDF para la carga.");
    }
  
    try {
      // Subir el archivo PDF a Cloudinary usando el tipo de recurso "raw"
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "raw" }, // Especificamos que es un archivo "raw" (no imagen)
          (error, uploadResult) => {
            if (error) {
              console.error('Error subiendo el archivo a Cloudinary:', error);
              return reject(error);
            }
            resolve(uploadResult); // Aquí devolvemos el resultado de la carga
          }
        );
        // Enviar el archivo desde la memoria al flujo de carga de Cloudinary
        uploadStream.end(req.file.buffer);
      });
  
      // Devolver la URL de descarga del archivo PDF con el parámetro attachment
      const downloadUrl = `${result.secure_url}?attachment=true`;
      return downloadUrl;
  
    } catch (error) {
      console.error('Error al gestionar el archivo PDF:', error);
      throw new Error(error.message);
    }
  }

module.exports = {
    upload,
    uploadToCloudinary,
    deleteFromCloudinary,
    getPublicIdFromUrl,
    gestionPDF,
};
