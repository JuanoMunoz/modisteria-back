const { Router } = require("express");
const { getAllPermisos, getPermisoById, createPermiso, updatePermiso, deletePermiso, statusPermiso} = require("../controllers/permiso.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllPermisos', [verifyToken, validateRolPermisoPermiso], getAllPermisos);

router.get('/getPermisoById/:id', [verifyToken, validateRolPermisoPermiso], getPermisoById);

router.post('/createPermiso', [verifyToken, validateRolPermisoPermiso], createPermiso);

router.put('/updatePermiso/:id', [verifyToken, validateRolPermisoPermiso], updatePermiso);

router.put('/statusPermiso/:id', [verifyToken, validateRolPermisoPermiso], statusPermiso);

router.delete('/deletePermiso/:id', [verifyToken, validateRolPermisoPermiso], deletePermiso);

module.exports = router;