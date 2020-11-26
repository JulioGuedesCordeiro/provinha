const express = require('express');
const controller = require('./filmes.controller');
const authorizationVerify = require('../middleware/verificaToken');

const api = express.Router();

api.post('/filmes/cadastrar', authorizationVerify, controller.cadastrar);
api.get('/filmes/buscar_por_id/:id', authorizationVerify, controller.buscarPorId);
api.get('/filmes/listar', authorizationVerify, controller.listar);

module.exports = api;
