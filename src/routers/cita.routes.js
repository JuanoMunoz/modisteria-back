// const router = require("express").Router();
const { Router } = require("express");
const { getAllCitas, getCitaById, createCita, updateCita, deleteCita, statusCita } = require("../controllers/cita.controller");
const router = Router();

router.get('/getAllCitas', [], getAllCitas);

router.get('/getCitaById/:id', [], getCitaById);

//router.post('/createCita',[verifyToken, validateRoleAdmin], createCita);
router.post('/createCita', createCita);

router.put('/updateCita/:id', [], updateCita);

router.put('/statusCita/:id', [], statusCita);

router.delete('/deleteCita/:id', [], deleteCita)

module.exports = router;