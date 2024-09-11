// const router = require("express").Router();
const { Router } = require("express");
const { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria, statusCategoria, getCategoriaByTipo} = require("../controllers/categoria.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllCategorias', [], getAllCategorias);

router.get('/getCategoriaById/:id', [], getCategoriaById);

router.get('/getCategoriaByTipo/:tipo', [], getCategoriaByTipo)

router.post('/createCategoria', createCategoria);

router.put('/updateCategoria/:id', [], updateCategoria);

router.put('/statusCategoria/:id', [], statusCategoria);

router.delete('/deleteCategoria/:id', [], deleteCategoria);

module.exports = router;