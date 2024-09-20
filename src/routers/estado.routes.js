// const router = require("express").Router();
const { Router } = require("express");
const { getAllEstados, getEstadoById, createEstado, updateEstado, deleteEstado, statusEstado } = require("../controllers/estado.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllEstados', [], getAllEstados);

router.get('/getEstadoById/:id', [], getEstadoById);

router.post('/createEstado', createEstado);

router.put('/updateEstado/:id', [], updateEstado);

router.put('/statusEstado/:id', [], statusEstado);

router.delete('/deleteEstado/:id', [], deleteEstado);

module.exports = router;