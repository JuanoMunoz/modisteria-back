// const router = require("express").Router();
const { Router } = require("express");
const { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion, statusCotizacion } = require("../controllers/cotizacion.controller");
const {upload} = require('../utils/image.js')
const router = Router();

router.get('/getAllCotizaciones', [], getAllCotizaciones);

router.get('/getCotizacionById/:id', [], getCotizacionById);

router.post('/createCotizacion', upload.single('file'), createCotizacion);

router.put('/updateCotizacion/:id', upload.single('file'), updateCotizacion);

router.put('/statusCotizacion/:id', [], statusCotizacion);

router.delete('/deleteCotizacion/:id', [], deleteCotizacion);

module.exports = router;