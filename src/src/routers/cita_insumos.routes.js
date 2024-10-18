const { Router } = require("express");
const { createAndDiscount} = require("../controllers/cita_insumo.controller");
const { ftCita} = require("../controllers/ficha.controller");
const router = Router();

router.put('/createAndDiscount', createAndDiscount);

router.get('/getCitas',ftCita )

module.exports = router;