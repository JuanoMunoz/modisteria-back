// const router = require("express").Router();
const { Router } = require("express");
const { getAllUsers, getUserById, createUser, updateUser, statusUser, deleteUser, login, forgotPassword, resetPassword, getCodePassword } = require("../controllers/usuario.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin, emailExist } = require("../validators/role.validator");
const router = Router();


//router.get('/getAllUsers', [verifyToken, validateRoleAdmin], getAllUsers);
router.get('/getAllUsers', [], getAllUsers);

router.get('/getUserById/:id', [], getUserById);

router.post('/createUser', createUser);

router.put('/updateUser/:id', [], updateUser);

router.put('/statusUser/:id', [], statusUser);

router.delete('/deleteUser/:id', [], deleteUser); 

router.post('/getCodePass', [], getCodePassword)

router.post('/login', [], login);

router.post('/forgotPassword', [], forgotPassword)

router.post('/resetPassword', [], resetPassword)

module.exports = router;