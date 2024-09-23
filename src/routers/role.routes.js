// const router = require("express").Router();
const { Router } = require("express");
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole, statusRole} = require("../controllers/role.controller");
const router = Router();

router.get('/getAllRoles', [], getAllRoles);

router.get('/getRolById/:id', [], getRoleById);

router.post('/createRol', createRole);

router.put('/updateRol/:id', [], updateRole);

router.put('/statusRol/:id', [], statusRole);

router.delete('/deleteRol/:id', [], deleteRole);

module.exports = router;