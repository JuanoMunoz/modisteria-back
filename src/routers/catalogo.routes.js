// const router = require("express").Router();
const { Router } = require("express");
const { getAllCatalogo, getCatalogoById, createCatalogo, updateCatalogo, deleteCatalogo, statusCatalogo, getCatalogoByCategoria} = require("../controllers/catalogo.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllCatalogo', [verifyToken, validateRoleAdmin], getAllCatalogo);

router.get('/getCatalogoById/:id', [], getCatalogoById);

router.get('/getCatalogoByCategoria/:categoriaId', [], getCatalogoByCategoria)

router.post('/createCatalogo', createCatalogo);

router.put('/updateCatalogo/:id', [], updateCatalogo);

router.put('/statusCatalogo/:id', [], statusCatalogo);

router.delete('/deleteCatalogo/:id', [], deleteCatalogo);

module.exports = router;