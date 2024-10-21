const { Router } = require("express");
const { getAllVentas, getVentaById, createVenta, getVentaByUsuarioId, confirmarVenta } = require("../controllers/venta.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllVentas', [verifyToken, buscarPermiso('VENTAS')], getAllVentas);

router.get('/getVentaById/:id', [verifyToken, buscarPermiso('VENTAS')], getVentaById);

router.get('/getVentaByUsuarioId/:id', [verifyToken, buscarPermiso('VENTAS')], getVentaByUsuarioId);

router.post('/createVenta', [verifyToken, buscarPermiso('VENTAS')], createVenta);

router.post('/confirmarVenta/:id', [verifyToken, buscarPermiso('VENTAS')], confirmarVenta);

module.exports = router;