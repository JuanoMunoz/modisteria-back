const { Router } = require("express");
const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, statusCatalogo, getCatalogoByCategoria} = require("../controllers/catalogo.controller");
const {upload} = require('../utils/image.js');
const { verifyToken } = require("../utils/verifyToken.js");
const { validateRolPermisoCatalogo } = require("../validators/validations.validator.js");

const router = Router();

router.get('/getAllCatalogo', getAllCatalogo);

router.get('/getCatalogoById/:id', [verifyToken, validateRolPermisoCatalogo], getCatalogoById);

router.get('/getCatalogoByCategoria/:categoriaId', [verifyToken, validateRolPermisoCatalogo], getCatalogoByCategoria)

router.post('/createCatalogo', [verifyToken, validateRolPermisoCatalogo, upload.single('file')], createCatalogo);

router.put('/updateCatalogo/:id', [verifyToken, validateRolPermisoCatalogo, upload.single('file')], updateCatalogo);

router.put('/statusCatalogo/:id', [verifyToken, validateRolPermisoCatalogo], statusCatalogo);

router.delete('/deleteCatalogo/:id', [verifyToken, validateRolPermisoCatalogo], deleteCatalogo);

module.exports = router;