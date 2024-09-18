// const router = require("express").Router();
const { Router } = require("express");
const { getAllPrendas, getPrendaById, createPrenda, updatePrenda, deletePrenda, statusPrenda} = require("../controllers/prenda.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const {upload} = require('../utils/image.js')
const router = Router();

router.get('/getAllPrendas', [], getAllPrendas);

router.get('/getPrendaById/:id', [], getPrendaById);

router.post('/createPrenda', upload.single('file'), createPrenda);

router.put('/updatePrenda/:id', upload.single('file'), updatePrenda);

router.put('/statusPrenda/:id', [], statusPrenda);

router.delete('/deletePrenda/:id', [], deletePrenda);

module.exports = router;