// const router = require("express").Router();
const { Router } = require("express");
const { getAllPQRS, getPQRSById, createPQRS, updatePQRS, deletePQRS, statusPQRS} = require("../controllers/pqrs.controller");
const { validateRolPermisoPQRS } = require("../validators/validations.validator");
const { verifyToken } = require("../utils/verifyToken");
const router = Router();

router.get('/getAllPQRS', [verifyToken, validateRolPermisoPQRS], getAllPQRS);

router.get('/getPQRSById/:id', [verifyToken, validateRolPermisoPQRS], getPQRSById);

router.post('/createPQRS', [verifyToken, validateRolPermisoPQRS], createPQRS);

router.put('/updatePQRS/:id', [verifyToken, validateRolPermisoPQRS], updatePQRS);

router.put('/statusPQRS/:id', [verifyToken, validateRolPermisoPQRS], statusPQRS);

router.delete('/deletePQRS/:id', [verifyToken, validateRolPermisoPQRS], deletePQRS);

module.exports = router;