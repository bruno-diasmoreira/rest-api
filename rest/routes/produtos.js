const express = require('express');
const router = express.Router();
const login  = require('../middleware/login');
const mysql = require("../mysql").pool;

const produtosController = require('../controllers/produtos-controller');

router.get('/',produtosController.getProdutos);

router.get('/:id_produto',produtosController.getProdutosById);

router.post('/',login,produtosController.postProdutos);

router.patch('/:id_produto',login,produtosController.updateProduto);

router.delete('/:id_produto',login,produtosController.deleteProdutos);

module.exports = router;