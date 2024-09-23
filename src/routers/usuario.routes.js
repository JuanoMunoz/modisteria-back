// const router = require("express").Router();
const { Router } = require("express");
const { getAllUsers, getUserById, createUser, updateUser, statusUser, deleteUser, login, forgotPassword, resetPassword, getCodePassword, getCodeVerification, verifyUser} = require("../controllers/usuario.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin, validateRoleAdminAndEmployee, validateRolPermisoUsuario } = require("../validators/validations.validator");
const router = Router();


//router.get('/getAllUsers', [verifyToken, validateRoleAdmin], getAllUsers);
router.get('/getAllUsers', [verifyToken, validateRolPermisoUsuario], getAllUsers);

router.get('/getUserById/:id', [verifyToken], getUserById);

router.post('/createUser', [], createUser);

router.post('/getCodeVerification', [], getCodeVerification);

router.post('/verifyUser', [], verifyUser);

router.put('/updateUser/:id', [verifyToken], updateUser);

router.put('/statusUser/:id', [verifyToken], statusUser);

router.delete('/deleteUser/:id', [verifyToken], deleteUser); 

router.post('/getCodePass', [], getCodePassword)

router.post('/login', [], login);

router.post('/forgotPassword', [], forgotPassword)

router.post('/resetPassword', [], resetPassword)

module.exports = router;