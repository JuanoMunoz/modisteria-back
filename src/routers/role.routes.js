// const router = require("express").Router();
const { Router } = require("express");
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole, statusRole} = require("../controllers/role.controller");
const { validateRolPermisoRoles } = require("../validators/validations.validator");
const { verifyToken } = require("../utils/verifyToken");
const router = Router();

router.get('/getAllRoles', [verifyToken, validateRolPermisoRoles], getAllRoles);

router.get('/getRolById/:id', [verifyToken, validateRolPermisoRoles], getRoleById);

router.post('/createRol', [verifyToken, validateRolPermisoRoles], createRole);

router.put('/updateRol/:id', [verifyToken, validateRolPermisoRoles], updateRole);

router.put('/statusRol/:id', [verifyToken, validateRolPermisoRoles], statusRole);

router.delete('/deleteRol/:id', [verifyToken, validateRolPermisoRoles], deleteRole);

module.exports = router;