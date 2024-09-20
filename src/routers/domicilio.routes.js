// const router = require("express").Router();
const { Router } = require("express");
const { getAllDomicilios, getDomicilioById, getDomiciliosByDomiciliario, createDomicilio, updateDomicilio, deleteDomicilio, statusDomicilio} = require("../controllers/domicilio.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllDomicilios', [], getAllDomicilios);

router.get('/getDomicilioById/:id', [], getDomicilioById);

router.get('/getDomiciliosByDomiciliario/:usuarioId', getDomiciliosByDomiciliario);

router.post('/createDomicilio', createDomicilio);

router.put('/updateDomicilio/:id', [], updateDomicilio);

router.put('/statusDomicilio/:id', [], statusDomicilio);

router.delete('/deleteDomicilio/:id', [], deleteDomicilio);

module.exports = router;