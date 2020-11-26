const { NotFound, BadRequest, Forbidden } = require('../exceptions');
const filmesService = require('./filmes.service');
const Schema = require('./filmes.schema');
const filmesModel = require('./filmes.model');

module.exports.listar = async (request, response, next) => {
  try {
    const { page, size, pesquisa } = request.query;
    const lista = await filmesModel.listar(page, size, pesquisa);
    const { models, pagination } = lista;
    return response.status(200).json({ data: models, pagination });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.cadastrar = async (req, res, next) => {
  const { error, value } = Schema.regrasCadastrar.validate(req.body);
  try {
    if (error) {
      return res.status(400).json(error);
    }
    if (req.usuario.isAdmin != true) {
      throw new Forbidden(
        'Apenas um administrador pode cadastrar um filme, entre em contato com um',
      );
    }

    const resposta = await filmesService.salvar(req.body);
    return res.status(200).json({ data: resposta, message: 'Filme Cadastrado com Sucesso' });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.buscarPorId = async (req, res, next) => {
  try {
    const resposta = await filmesModel.obterPorIdComRelacionamentos(req.params.id);
    if(resposta == null) {
        throw new NotFound("Esse filme não se encontra disponivel");
    }
    const notaFilme = await filmesService.calculaNotaDoFilme(resposta.toJSON());
    console.log('RESPOSTA', notaFilme)
    return res
      .status(200)
      .json({ data: resposta, notaFilme: notaFilme, message: 'Filme Buscado com Sucesso' });
  } catch (erro) {
    return next(erro);
  }
};
