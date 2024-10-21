const { Router } = require("express");
const { getAllTallas, getTallaById, createTalla, updateTalla, deleteTalla, statusTalla} = require("../controllers/talla.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllTallas', [verifyToken, buscarPermiso('TALLA')], getAllTallas);

router.get('/getTallaById/:id', [verifyToken, buscarPermiso('TALLA')], getTallaById);

router.post('/createTalla', [verifyToken, buscarPermiso('TALLA')], createTalla);

router.put('/updateTalla/:id', [verifyToken, buscarPermiso('TALLA')], updateTalla);

router.put('/statusTalla/:id', [verifyToken, buscarPermiso('TALLA')], statusTalla);

router.delete('/deleteTalla/:id', [verifyToken, buscarPermiso('TALLA')], deleteTalla);

module.exports = router;