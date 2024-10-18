const { Router } = require("express");
const { getAllTallas, getTallaById, createTalla, updateTalla, deleteTalla, statusTalla} = require("../controllers/talla.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoTalla } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllTallas', [verifyToken, validateRolPermisoTalla], getAllTallas);

router.get('/getTallaById/:id', [verifyToken, validateRolPermisoTalla], getTallaById);

router.post('/createTalla', [verifyToken, validateRolPermisoTalla], createTalla);

router.put('/updateTalla/:id', [verifyToken, validateRolPermisoTalla], updateTalla);

router.put('/statusTalla/:id', [verifyToken, validateRolPermisoTalla], statusTalla);

router.delete('/deleteTalla/:id', [verifyToken, validateRolPermisoTalla], deleteTalla);

module.exports = router;