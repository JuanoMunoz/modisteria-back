const {Router} = require('express');
const {getAllPedido, getPedidoById, createPedido, updatePedido, deletePedido} = require('../controllers/pedido.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');
const { validateRolPermisoPedido } = require('../validators/validations.validator.js');
const router = Router();

router.get('/getAllPedido', [verifyToken, validateRolPermisoPedido], getAllPedido);

router.get('/getPedidoById/:id', [verifyToken, validateRolPermisoPedido], getPedidoById);

router.post('/createPedido', [verifyToken, validateRolPermisoPedido], createPedido);

router.put('/updatePedido/:idPedido', [verifyToken, validateRolPermisoPedido], updatePedido);

router.delete('/deletePedido/:id', [verifyToken, validateRolPermisoPedido], deletePedido); 

module.exports = router;