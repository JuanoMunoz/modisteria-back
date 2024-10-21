const { Router } = require("express");
const { getAllEstados, getEstadoById, createEstado, updateEstado, deleteEstado, statusEstado } = require("../controllers/estado.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllEstados', [verifyToken, buscarPermiso('ESTADO')], getAllEstados);

router.get('/getEstadoById/:id', [verifyToken, buscarPermiso('ESTADO')], getEstadoById);

router.post('/createEstado', [verifyToken, buscarPermiso('ESTADO')], createEstado);

router.put('/updateEstado/:id', [verifyToken, buscarPermiso('ESTADO')], updateEstado);

router.put('/statusEstado/:id', [verifyToken, buscarPermiso('ESTADO')], statusEstado);

router.delete('/deleteEstado/:id', [verifyToken, buscarPermiso('ESTADO')], deleteEstado);

module.exports = router;