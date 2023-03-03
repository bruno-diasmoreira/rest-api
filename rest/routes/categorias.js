const express = require('express');
const router = express.Router();
const login  = require('../middleware/login');
const mysql = require("../mysql").pool;

const categoriasController = require('../controllers/categorias-controller');

router.get('/',categoriasController.getCategorias);

module.exports = router;