const {Router} = require('express');
const {getAllPedido, getPedidoById, createPedido, updatePedido, deletePedido} = require('../controllers/pedido.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');
const { validateRolPermisoPedido } = require('../validators/validations.validator.js');
const router = Router();

router.get('/getAllPedido', [verifyToken, validateRolPermisoPedido], getAllPedido);

router.get('/getPedidoById/:id', [verifyToken], getPedidoById);

router.post('/createPedido', [verifyToken], createPedido);

router.put('/updatePedido/:idPedido', [verifyToken], updatePedido);

router.delete('/deletePedido/:id', [verifyToken], deletePedido); 

module.exports = router;