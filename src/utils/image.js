const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log('Archivo recibido:', file);
        cb(null, true);
    }
});


async function helperImg(inputPath, outputFilename, width) {
    try {
        console.log(`Procesando imagen en: ${inputPath}`);
        await sharp(inputPath)
            .resize(width)
            .toFile(`./optimize/${outputFilename}`);
        console.log(`Imagen procesada y guardada en: ./optimize/${outputFilename}`);
    } catch (error) {
        console.error(`Error procesando la imagen: ${error.message}`);
        throw error; // Lanzar el error para que el catch en createCatalogo lo capture
    }
};

async function uploadToCloudinary(filePath) {
    try {
        console.log(`Subiendo archivo a Cloudinary: ${filePath}`);
        const result = await cloudinary.uploader.upload(filePath);
        console.log('Resultado de Cloudinary:', result);
        return result;
    } catch (error) {
        console.error(`Error subiendo archivo a Cloudinary:`, error);
        throw error;
    }
};

module.exports = {
    upload,
    helperImg,
    uploadToCloudinary
};