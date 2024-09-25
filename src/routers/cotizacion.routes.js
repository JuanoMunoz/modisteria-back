// const router = require("express").Router();
const { Router } = require("express");
const { getAllCotizaciones, getCotizacionById, createCotizacion, updateCotizacion, deleteCotizacion, statusCotizacion } = require("../controllers/cotizacion.controller");
const {upload} = require('../utils/image.js');
const { verifyToken } = require("../utils/verifyToken.js");
const { validateRolPermisoCotizacion } = require("../validators/validations.validator.js");
const router = Router();

router.get('/getAllCotizaciones', [verifyToken, validateRolPermisoCotizacion], getAllCotizaciones);

router.get('/getCotizacionById/:id', [verifyToken, validateRolPermisoCotizacion], getCotizacionById);

router.post('/createCotizacion', [upload.single('file')], createCotizacion);

router.put('/updateCotizacion/:id', [verifyToken, upload.single('file')], updateCotizacion);

router.put('/statusCotizacion/:id', [verifyToken, validateRolPermisoCotizacion], statusCotizacion);

router.delete('/deleteCotizacion/:id', [verifyToken, validateRolPermisoCotizacion], deleteCotizacion);

module.exports = router;