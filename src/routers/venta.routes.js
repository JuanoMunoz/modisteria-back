const { Router } = require("express");
const { getAllVentas, getVentaById, createVenta } = require("../controllers/venta.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoVenta } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllVentas', [verifyToken, validateRolPermisoVenta], getAllVentas);

router.get('/getVentaById/:id', [verifyToken, validateRolPermisoVenta], getVentaById);

router.post('/createVenta', [verifyToken, validateRolPermisoVenta], createVenta);

module.exports = router;