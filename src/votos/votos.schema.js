const joi = require("joi");

const regrasCadastrar = joi.object().keys({
  valor: joi.number().integer().min(0).max(4).required(),
  filme_id: joi.number().integer().required(),
  criado_em: joi.allow(null).optional(),
  atualizado_em: joi.allow(null).optional(),
});

module.exports = {
  regrasCadastrar,
};