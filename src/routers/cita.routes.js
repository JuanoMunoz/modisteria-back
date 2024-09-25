// const router = require("express").Router();
const { Router } = require("express");
const { getAllCitas, getCitaById, createCita, updateCita, deleteCita, statusCita } = require("../controllers/cita.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoCita } = require("../validators/validations.validator");
const { upload } = require('../utils/image.js');

const router = Router();

router.get('/getAllCitas', [verifyToken, validateRolPermisoCita], getAllCitas);

router.get('/getCitaById/:id', [verifyToken, validateRolPermisoCita], getCitaById);

router.post('/createCita', [verifyToken, validateRolPermisoCita, upload.single('file')], createCita);

router.put('/updateCita/:id', [verifyToken, validateRolPermisoCita, upload.single('file')], updateCita);

router.put('/statusCita/:id', [verifyToken, validateRolPermisoCita], statusCita);

router.delete('/deleteCita/:id', [verifyToken, validateRolPermisoCita], deleteCita)

module.exports = router;