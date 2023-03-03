const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool

const pedidosController = require('../controllers/pedidos-controller');


router.get('/',pedidosController.getPedidos);

router.get('/:id_pedido',pedidosController.getPedidosById);

router.post('/',pedidosController.postPedidos);

router.patch('/:id_pedido',pedidosController.updatePedido);

router.delete('/:id_pedido',pedidosController.deletePedidos);

module.exports = router;