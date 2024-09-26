const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        cb(null, true);
    }
});

async function helperImg(buffer, width) {
    try {
        const processedBuffer = await sharp(buffer)
            .resize(width)
            .toBuffer(); 
        return processedBuffer;
    } catch (error) {
        console.error(`Error procesando la imagen: ${error.message}`);
        throw error;
    }
}

async function uploadToCloudinary(buffer) {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    console.error('Error subiendo archivo a Cloudinary:', error);
                    return reject(error);
                }
                resolve(result);
            });
            
            uploadStream.end(buffer);
        });
    } catch (error) {
        console.error(`Error subiendo archivo a Cloudinary:`, error);
        throw error;
    }
}

async function deleteFromCloudinary(publicId) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error(`Error eliminando la imagen de Cloudinary: ${error.message}`);
        throw error;
    }
}

function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0]; 
    return publicId;
}


module.exports = {
    upload,
    helperImg,
    uploadToCloudinary,
    deleteFromCloudinary,
    getPublicIdFromUrl
};
