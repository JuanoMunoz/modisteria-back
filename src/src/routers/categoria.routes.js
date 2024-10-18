const { Router } = require("express");
const { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria, statusCategoria, getCategoriaByTipo} = require("../controllers/categoria.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoCategoria } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllCategorias', [], getAllCategorias);

router.get('/getCategoriaById/:id', [verifyToken, validateRolPermisoCategoria], getCategoriaById);

router.get('/getCategoriaByTipo/:tipo', [verifyToken, validateRolPermisoCategoria], getCategoriaByTipo)

router.post('/createCategoria', [verifyToken, validateRolPermisoCategoria], createCategoria);

router.put('/updateCategoria/:id', [verifyToken, validateRolPermisoCategoria], updateCategoria);

router.put('/statusCategoria/:id', [verifyToken, validateRolPermisoCategoria], statusCategoria);

router.delete('/deleteCategoria/:id', [verifyToken, validateRolPermisoCategoria], deleteCategoria);

module.exports = router;