const joi = require("joi");

const regrasCadastrar = joi.object().keys({
  nome: joi.string().min(3).max(100).required(),
  senha: joi.string().min(3).max(100).required(),
  email: joi.string().min(3).max(100).required(),
  senha: joi.string().min(3).max(100).required(),
  login: joi.string().min(3).max(100).required(),
  criado_em: joi.allow(null).optional(),
  atualizado_em: joi.allow(null).optional(),
});


module.exports = {
  regrasCadastrar,
};
