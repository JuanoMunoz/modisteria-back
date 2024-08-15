// const router = require("express").Router();
const { Router } = require("express");
const { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo, statusInsumo} = require("../controllers/insumo.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllInsumos', [verifyToken, validateRoleAdmin], getAllInsumos);

router.get('/getInsumoById/:id', [], getInsumoById);

router.post('/createInsumo', createInsumo);

router.put('/updateInsumo/:id', [], updateInsumo);

router.put('/statusInsumo/:id', [], statusInsumo);

router.delete('/deleteInsumo/:id', [], deleteInsumo);

module.exports = router;