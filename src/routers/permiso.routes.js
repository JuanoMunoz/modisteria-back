// const router = require("express").Router();
const { Router } = require("express");
const { getAllPermisos, getPermisoById, createPermiso, updatePermiso, deletePermiso, statusPermiso} = require("../controllers/permiso.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin } = require("../validators/role.validator");
const router = Router();

router.get('/getAllPermisos', [verifyToken, validateRoleAdmin], getAllPermisos);

router.get('/getPermisoById/:id', [], getPermisoById);

router.post('/createPermiso', createPermiso);

router.put('/updatePermiso/:id', [], updatePermiso);

router.put('/statusPermiso/:id', [], statusPermiso);

router.delete('/deletePermiso/:id', [], deletePermiso);

module.exports = router;