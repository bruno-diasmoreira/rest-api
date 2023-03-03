const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const jwt = require('jsonwebtoken');

const usuariosController = require('../controllers/usuarios-controller');


router.post('/cadastro',usuariosController.cadastrarUsuario);

router.post('/login',usuariosController.login);

module.exports = router;