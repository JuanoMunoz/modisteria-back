// const router = require("express").Router();
const { Router } = require("express");
const { createAndDiscount } = require("../controllers/cita_insumo.controller");
const router = Router();


router.post('/createAndDiscount', createAndDiscount);

module.exports = router;