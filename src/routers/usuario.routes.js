// const router = require("express").Router();
const { Router } = require("express");
const { getAllUsers, getUserById, createUser, updateUser, statusUser, deleteUser, login, forgotPassword, resetPassword } = require("../controllers/usuario.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin, emailExist } = require("../validators/role.validator");
const router = Router();

router.get('/getAllUsers', [verifyToken, validateRoleAdmin], getAllUsers);

router.get('/getUserById/:id', [], getUserById);

router.post('/createUser', [emailExist], createUser);

router.put('/updateUser/:id', [], updateUser);

router.update('/statusUser/:id', [], statusUser);

router.destroy('/deleteUser/:id', [], deleteUser); 

router.post('/login', [], login);

router.post('/forgotPassword', [], forgotPassword)

router.post('/resetPassword', [], resetPassword)




module.exports = router;