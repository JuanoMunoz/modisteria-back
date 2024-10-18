const { Router } = require("express");
const { getAllEstados, getEstadoById, createEstado, updateEstado, deleteEstado, statusEstado } = require("../controllers/estado.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoEstado } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllEstados', [verifyToken, validateRolPermisoEstado], getAllEstados);

router.get('/getEstadoById/:id', [verifyToken, validateRolPermisoEstado], getEstadoById);

router.post('/createEstado', [verifyToken, validateRolPermisoEstado], createEstado);

router.put('/updateEstado/:id', [verifyToken, validateRolPermisoEstado], updateEstado);

router.put('/statusEstado/:id', [verifyToken, validateRolPermisoEstado], statusEstado);

router.delete('/deleteEstado/:id', [verifyToken, validateRolPermisoEstado], deleteEstado);

module.exports = router;