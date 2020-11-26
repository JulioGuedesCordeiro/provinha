const express = require('express');
const controller = require('./votos.controller');
const authorizationVerify = require('../middleware/verificaToken');

const api = express.Router();

api.post('/voto/cadastrar', authorizationVerify, controller.cadastrar);

module.exports = api;
