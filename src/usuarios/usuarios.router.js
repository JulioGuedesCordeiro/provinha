const express = require("express");
const controller = require("./usuarios.controller");
const authorizationVerify = require("../middleware/verificaToken");

const api = express.Router();
api.post("/usuarios/cadastrar", controller.cadastrar);
api.put("/usuarios/atualizar/:id", authorizationVerify, controller.atualizar);
api.post("/usuarios/login", controller.login);
api.delete("/usuarios/deletar/:id", authorizationVerify,controller.deletar);
api.patch("/usuarios/reativar_usuario/:id", authorizationVerify, controller.reativar);

module.exports = api;