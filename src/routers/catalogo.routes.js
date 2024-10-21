const { Router } = require("express");
const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, statusCatalogo, getCatalogoByCategoria} = require("../controllers/catalogo.controller");
const {upload} = require('../utils/image.js');
const { verifyToken } = require("../utils/verifyToken.js");
const { buscarPermiso } = require("../validators/validations.validator.js");

const router = Router();

router.get('/getAllCatalogo', getAllCatalogo);

router.get('/getCatalogoById/:id', [verifyToken, buscarPermiso('CATALOGO')], getCatalogoById);

router.get('/getCatalogoByCategoria/:categoriaId', [verifyToken, buscarPermiso('CATALOGO')], getCatalogoByCategoria)

router.post('/createCatalogo', [verifyToken, buscarPermiso('CATALOGO'), upload.single('file')], createCatalogo);

router.put('/updateCatalogo/:id', [verifyToken, buscarPermiso('CATALOGO'), upload.single('file')], updateCatalogo);

router.put('/statusCatalogo/:id', [verifyToken, buscarPermiso('CATALOGO')], statusCatalogo);

router.delete('/deleteCatalogo/:id', [verifyToken, buscarPermiso('CATALOGO')], deleteCatalogo);

module.exports = router;