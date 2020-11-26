const { NotFound, BadRequest, Forbidden } = require('../exceptions');
const votosService = require("./votos.service");
const Schema = require('./votos.schema');
const filmeModel = require('../filmes/filmes.model');

module.exports.cadastrar = async (req, res, next) => {
  const { error, value } = Schema.regrasCadastrar.validate(req.body);
  try {
    if (error) {
      return res.status(400).json(error);
    }

    filme = await filmeModel.obterPorId(req.body.filme_id);
    if (filme === null) {
      throw new NotFound("Esse filme não se encontra disponivel para votação");
    }

    const resposta = await votosService.salvar(req.body);
    return res.status(200).json({data: resposta, message: 'Voto Cadastrado com Sucesso' });
  } catch (erro) {
    return next(erro);
  }
};
