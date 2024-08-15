// const router = require("express").Router();
const { Router } = require("express");
const { getAllPrendas, getPrendaById, createPrenda, updatePrenda, deletePrenda, statusPrenda} = require("../controllers/prenda.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllprendas', [verifyToken, validateRoleAdmin], getAllPrendas);

router.get('/getPrendaById/:id', [], getPrendaById);

router.post('/createPrenda', createPrenda);

router.put('/updatePrenda/:id', [], updatePrenda);

router.put('/statusPrenda/:id', [], statusPrenda);

router.delete('/deletePrenda/:id', [], deletePrenda);

module.exports = router;