const bookshelf = require('../db');
const filmesModel = require('./filmes.model');
const atoresModel = require('../atores/atores.model');
const _ = require('lodash');

const montarDados = async (dado) => {
  const dadosFormatados = {
    nome_filme: dado.nome_filme,
    descricao: dado.descricao,
    diretor: dado.diretor,
    genero: dado.genero,
    situacao: 'ATIVO',
  };
  return dadosFormatados;
};

const salvar = async (dado) =>
  bookshelf.transaction(async (transacao) => {
    const objetoMontado = await montarDados(dado);
    try {
      const filmeCriado = await filmesModel.forge().save(objetoMontado, { transacting: transacao });
      if (dado.atores && dado.atores.length > 1) {
        await Promise.all(
          dado.atores.map((ator) => {
            return atoresModel.salvar(ator.nome, filmeCriado.get('id'), transacao);
          }),
        );
      }
      return filmeCriado;
    } catch (error) {
      throw error;
    }
  });

const calculaNotaDoFilme = async (filme) => {
  if (filme.votos && filme.votos.length > 0) {
    const x = _.reduce(
      filme.votos,
      function (sum, n) {
        return sum + n.valor;
      },
      0,
    );
    return _.round(x / filme.votos.length, 2);
  }
};

module.exports = {
  salvar,
  calculaNotaDoFilme
};
