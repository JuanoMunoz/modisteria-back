const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');

// Configurar multer para almacenar la imagen en memoria
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log('Archivo recibido:', file);
        cb(null, true);
    }
});

// Procesar la imagen desde el buffer en memoria y subirla a Cloudinary
async function helperImg(buffer, width) {
    try {
        console.log('Procesando imagen desde buffer en memoria');
        const processedBuffer = await sharp(buffer)
            .resize(width)
            .toBuffer();  // Convertir la imagen procesada en buffer nuevamente
        return processedBuffer;
    } catch (error) {
        console.error(`Error procesando la imagen: ${error.message}`);
        throw error;
    }
}

async function uploadToCloudinary(buffer) {
    try {
        console.log('Subiendo archivo directamente a Cloudinary');
        
        // Usamos una promesa para capturar el resultado de Cloudinary
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    console.error('Error subiendo archivo a Cloudinary:', error);
                    return reject(error);
                }
                console.log('Resultado de Cloudinary:', result);
                resolve(result);  // Devolver el resultado
            });
            
            // Iniciar la subida desde el buffer
            uploadStream.end(buffer);
        });
    } catch (error) {
        console.error(`Error subiendo archivo a Cloudinary:`, error);
        throw error;
    }
}

//Eliminar imagen de cloudinary
async function deleteFromCloudinary(publicId) {
    try {
        console.log(`Eliminando imagen con public_id: ${publicId} de Cloudinary`);
        await cloudinary.uploader.destroy(publicId);
        console.log('Imagen eliminada de Cloudinary');
    } catch (error) {
        console.error(`Error eliminando la imagen de Cloudinary: ${error.message}`);
        throw error;
    }
}

function getPublicIdFromUrl(url) {
    // Extraer el public_id desde la URL de la imagen de Cloudinary
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];  // Eliminar la extensión
    return publicId;
}


module.exports = {
    upload,
    helperImg,
    uploadToCloudinary,
    deleteFromCloudinary,
    getPublicIdFromUrl
};
