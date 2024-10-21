const { Router } = require("express");
const { getAllDomicilios, getDomicilioById, getDomiciliosByDomiciliario, getDomiciliosByClienteId, createDomicilio, updateDomicilio, deleteDomicilio, statusDomicilio} = require("../controllers/domicilio.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllDomicilios', [verifyToken, buscarPermiso('DOMICILIO')], getAllDomicilios);

router.get('/getDomicilioById/:id', [verifyToken, buscarPermiso('DOMICILIO')], getDomicilioById);

router.get('/getDomiciliosByDomiciliario/:usuarioId', [verifyToken, buscarPermiso('DOMICILIO')], getDomiciliosByDomiciliario);

router.get('/getDomiciliosByClienteId/:id', [verifyToken, buscarPermiso('DOMICILIO')], getDomiciliosByClienteId);

router.post('/createDomicilio', [verifyToken, buscarPermiso('DOMICILIO')], createDomicilio);

router.put('/updateDomicilio/:id', [verifyToken, buscarPermiso('DOMICILIO')], updateDomicilio);

router.put('/statusDomicilio/:id', [verifyToken, buscarPermiso('DOMICILIO')], statusDomicilio);

router.delete('/deleteDomicilio/:id', [verifyToken, buscarPermiso('DOMICILIO')], deleteDomicilio);

module.exports = router;