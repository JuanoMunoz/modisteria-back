const { Router } = require("express");
const { getAllPQRS, getPQRSById, createPQRS, updatePQRS, deletePQRS, statusPQRS} = require("../controllers/pqrs.controller");
const { buscarPermiso } = require("../validators/validations.validator");
const { verifyToken } = require("../utils/verifyToken");
const router = Router();

router.get('/getAllPQRS', [verifyToken, buscarPermiso('PQRS')], getAllPQRS);

router.get('/getPQRSById/:id', [verifyToken, buscarPermiso('PQRS')], getPQRSById);

router.post('/createPQRS', [verifyToken, buscarPermiso('PQRS')], createPQRS);

router.put('/updatePQRS/:id', [verifyToken, buscarPermiso('PQRS')], updatePQRS);

router.put('/statusPQRS/:id', [verifyToken, buscarPermiso('PQRS')], statusPQRS);

router.delete('/deletePQRS/:id', [verifyToken, buscarPermiso('PQRS')], deletePQRS);

module.exports = router;