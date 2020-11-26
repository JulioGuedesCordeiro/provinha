const joi = require("joi");

const regrasCadastrar = joi.object().keys({
  nome_filme: joi.string().min(3).max(100).required(),
  descricao: joi.string().min(3).max(100).required(),
  diretor: joi.string().min(3).max(100).required(),
  genero: joi.string().min(3).max(100).required(),
  atores: joi.array().items(joi.object({
    nome: joi.string().min(3).max(100).label("O nome do ator deve ter no minimo 3 caracteres")
  })),
  criado_em: joi.allow(null).optional(),
  atualizado_em: joi.allow(null).optional(),
});

module.exports = {
  regrasCadastrar,
};