// const router = require("express").Router();
const { Router } = require("express");
const { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion, statusCotizacion } = require("../controllers/cotizacion.controller");
const router = Router();

router.get('/getAllCotizaciones', [], getAllCotizaciones);

router.get('/getCotizacionById/:id', [], getCotizacionById);

router.post('/createCotizacion', createCotizacion);

router.put('/updateCotizacion/:id', [], updateCotizacion);

router.put('/statusCotizacion/:id', [], statusCotizacion);

router.delete('/deleteCotizacion/:id', [], deleteCotizacion);

module.exports = router;