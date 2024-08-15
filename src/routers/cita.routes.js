// const router = require("express").Router();
const { Router } = require("express");
const { getAllCitas, getCitaById, createCita, updateCita, deleteCita, statusCita } = require("../controllers/cita.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllCitas', [verifyToken, validateRoleAdmin], getAllCitas);

router.get('/getCitaById/:id', [], getCitaById);

router.post('/createCita', createCita);

router.put('/updateCita/:id', [], updateCita);

router.update('/statusCita/:id', [], statusCita);

router.destroy('/deleteCita/:id', [], deleteCita)

module.exports = router;