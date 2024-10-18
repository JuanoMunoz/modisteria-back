const { Router } = require("express");
const { getAllUsers, getUserById, createUser, updateUser, statusUser, deleteUser, login, forgotPassword, resetPassword, getCodePassword, getCodeVerification, verifyUser, isYourCurrentPassword, resetCurrentPassword, updateInfo, createUsuario} = require("../controllers/usuario.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRolPermisoUsuario } = require("../validators/validations.validator");
const router = Router();

router.get('/getAllUsers', [verifyToken, validateRolPermisoUsuario], getAllUsers);

router.get('/getUserById/:id', [verifyToken, validateRolPermisoUsuario], getUserById);

router.post('/createUser', [], createUser);
router.post('/createUsuario', [], createUsuario);

router.post('/getCodeVerification', [], getCodeVerification);

router.post('/verifyUser', [], verifyUser);

router.put('/updateUser/:id', [verifyToken, validateRolPermisoUsuario], updateUser);
router.put('/updateInfo/:id', [verifyToken], updateInfo);

router.put('/statusUser/:id', [verifyToken, validateRolPermisoUsuario], statusUser);

router.delete('/deleteUser/:id', [verifyToken, validateRolPermisoUsuario], deleteUser); 

router.post('/getCodePass', [], getCodePassword)

router.post('/login', [], login);

router.post('/forgotPassword', [], forgotPassword)

router.post('/resetPassword', [], resetPassword)
router.post('/isYourCurrentPassword', [], isYourCurrentPassword)
router.post('/resetCurrentPassword', [verifyToken], resetCurrentPassword)

module.exports = router;