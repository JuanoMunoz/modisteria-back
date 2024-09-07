// const router = require("express").Router();
const { Router } = require("express");
const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, statusCatalogo, getCatalogoByCategoria} = require("../controllers/catalogo.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const {upload} = require('../utils/image.js')

const router = Router();

router.get('/getAllCatalogo', [], getAllCatalogo);

router.get('/getCatalogoById/:id', [], getCatalogoById);

router.get('/getCatalogoByCategoria/:categoriaId', [], getCatalogoByCategoria)

router.post('/createCatalogo', upload.single('file'), createCatalogo);

router.put('/updateCatalogo/:id', upload.single('file'), updateCatalogo);

router.put('/statusCatalogo/:id', [], statusCatalogo);

router.delete('/deleteCatalogo/:id', [], deleteCatalogo);

module.exports = router;