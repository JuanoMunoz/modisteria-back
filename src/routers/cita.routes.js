// const router = require("express").Router();
const { Router } = require("express");
const { getAllCitas, getCitaById, createCita, updateCita, deleteCita, statusCita } = require("../controllers/cita.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoCita } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllCitas', [verifyToken, validateRolPermisoCita], getAllCitas);

router.get('/getCitaById/:id', [verifyToken, validateRolPermisoCita], getCitaById);

router.post('/createCita', [verifyToken, validateRolPermisoCita], createCita);

router.put('/updateCita/:id', [verifyToken, validateRolPermisoCita], updateCita);

router.put('/statusCita/:id', [verifyToken, validateRolPermisoCita], statusCita);

router.delete('/deleteCita/:id', [verifyToken, validateRolPermisoCita], deleteCita)

module.exports = router;