const express = require('express');
const api = express.Router();

api.use(require('./usuarios/usuarios.router'));
api.use(require('./filmes/filmes.router'));
api.use(require('./votos/votos.router'));
module.exports = api;