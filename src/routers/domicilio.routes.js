const { Router } = require("express");
const { getAllDomicilios, getDomicilioById, getDomiciliosByDomiciliario, getDomiciliosByCliente, createDomicilio, updateDomicilio, deleteDomicilio, statusDomicilio} = require("../controllers/domicilio.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoDomicilio } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllDomicilios', [verifyToken, validateRolPermisoDomicilio], getAllDomicilios);

router.get('/getDomicilioById/:id', [verifyToken, validateRolPermisoDomicilio], getDomicilioById);

router.get('/getDomiciliosByDomiciliario/:usuarioId', [verifyToken, validateRolPermisoDomicilio], getDomiciliosByDomiciliario);

router.get('/getDomiciliosByCliente/:usuarioId', [verifyToken, validateRolPermisoDomicilio], getDomiciliosByCliente);

router.post('/createDomicilio', [verifyToken, validateRolPermisoDomicilio], createDomicilio);

router.put('/updateDomicilio/:id', [verifyToken, validateRolPermisoDomicilio], updateDomicilio);

router.put('/statusDomicilio/:id', [verifyToken, validateRolPermisoDomicilio], statusDomicilio);

router.delete('/deleteDomicilio/:id', [verifyToken, validateRolPermisoDomicilio], deleteDomicilio);

module.exports = router;