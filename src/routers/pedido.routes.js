const {Router} = require('express');
const {getAllPedido, getPedidoById, createPedido, updatePedido, deletePedido} = require('../controllers/pedido.controller.js');
const router = Router();

router.get('/getAllPedido', [], getAllPedido);

router.get('/getPedidoById/:id', [], getPedidoById);

router.post('/createPedido', createPedido);

router.put('/updatePedido/:idPedido', [], updatePedido);


router.delete('/deletePedido/:id', [], deletePedido); 

module.exports = router;