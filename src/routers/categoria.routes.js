// const router = require("express").Router();
const { Router } = require("express");
const { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria, statusCategoria} = require("../controllers/categoria.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllCategorias', [verifyToken, validateRoleAdmin], getAllCategorias);

router.get('/getCategoriaById/:id', [], getCategoriaById);

router.post('/createCategoria', createCategoria);

router.put('/updateCategoria/:id', [], updateCategoria);

router.update('/statusCategoria/:id', [], statusCategoria);

router.destroy('/deleteCategoria/:id', [], deleteCategoria);

module.exports = router;