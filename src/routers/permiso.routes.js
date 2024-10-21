const { Router } = require("express");
const { getAllPermisos, getPermisoById, createPermiso, updatePermiso, deletePermiso, statusPermiso} = require("../controllers/permiso.controller");
const { verifyToken } = require("../utils/verifyToken");
const { buscarPermiso } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllPermisos', [verifyToken, buscarPermiso('PERMISO')], getAllPermisos);

router.get('/getPermisoById/:id', [verifyToken, buscarPermiso('PERMISO')], getPermisoById);

router.post('/createPermiso', [verifyToken, buscarPermiso('PERMISO')], createPermiso);

router.put('/updatePermiso/:id', [verifyToken, buscarPermiso('PERMISO')], updatePermiso);

router.put('/statusPermiso/:id', [verifyToken, buscarPermiso('PERMISO')], statusPermiso);

router.delete('/deletePermiso/:id', [verifyToken, buscarPermiso('PERMISO')], deletePermiso);

module.exports = router;