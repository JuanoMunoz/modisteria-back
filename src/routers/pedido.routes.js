const { Router } = require('express');
const { getAllPedido, getPedidoById, createPedido, updatePedido, deletePedido } = require('../controllers/pedido.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');
const { buscarPermiso } = require('../validators/validations.validator.js');
const router = Router();

router.get('/getAllPedido', [verifyToken, buscarPermiso('PEDIDO')], getAllPedido);

router.get('/getPedidoById/:id', [verifyToken, buscarPermiso('PEDIDO')], getPedidoById);

router.post('/createPedido', [verifyToken, buscarPermiso('PEDIDO')], createPedido);

router.put('/updatePedido/:idPedido', [verifyToken, buscarPermiso('PEDIDO')], updatePedido);

router.delete('/deletePedido/:id', [verifyToken, buscarPermiso('PEDIDO')], deletePedido); 

module.exports = router;