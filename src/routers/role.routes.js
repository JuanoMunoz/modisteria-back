const { Router } = require("express");
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole, statusRole} = require("../controllers/role.controller");
const { buscarPermiso } = require("../validators/validations.validator");
const { verifyToken } = require("../utils/verifyToken");
const router = Router();

router.get('/getAllRoles', [verifyToken, buscarPermiso('ROLES')], getAllRoles);

router.get('/getRolById/:id', [verifyToken, buscarPermiso('ROLES')], getRoleById);

router.post('/createRol', [verifyToken, buscarPermiso('ROLES')], createRole);

router.put('/updateRol/:id', [verifyToken, buscarPermiso('ROLES')], updateRole);

router.put('/statusRol/:id', [verifyToken, buscarPermiso('ROLES')], statusRole);

router.delete('/deleteRol/:id', [verifyToken, buscarPermiso('ROLES')], deleteRole);

module.exports = router;