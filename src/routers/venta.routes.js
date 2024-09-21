// const router = require("express").Router();
const { Router } = require("express");
const { getAllVentas, getVentaById, createVenta } = require("../controllers/venta.controller");
const router = Router();

router.get('/getAllVentas', [], getAllVentas);

router.get('/getVentaById/:id', [], getVentaById);

router.post('/createVenta', createVenta);

module.exports = router;