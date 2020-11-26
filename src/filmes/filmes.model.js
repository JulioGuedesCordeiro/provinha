var bookshelf = require('../db');
const Atores = require('../atores/atores.model');
const Votos = require('../votos/votos.model');
const _ = require('lodash');

var Filmes = bookshelf.Model.extend(
  {
    tableName: 'filme',
    // virtuals: {
    //   notaFilmeee() {
    //     return 1;
    //   },
    // },
    atores() {
      return this.hasMany(Atores, 'filme_id');
    },
    votos() {
      return this.hasMany(Votos, 'filme_id');
    },
  },
  {
    withRelated: ['atores', 'votos'],
    async listar(page = 0, size = 10, pesquisa = '') {
      const relacionamentos = this.withRelated;
      const query = Filmes.query((filme) => {
        filme.leftJoin('ator', 'ator.filme_id', 'filme.id');
        filme.orWhere('descricao', 'LIKE', `%${pesquisa}%`);
        filme.orWhere('diretor', 'LIKE', `%${pesquisa}%`);
        filme.orWhere('genero', 'LIKE', `%${pesquisa}%`);
        filme.orWhere('situacao', 'LIKE', `%${pesquisa}%`);
        filme.orWhere('nome_filme', 'LIKE', `%${pesquisa}%`);
        filme.orWhere('ator.nome', 'LIKE', `%${pesquisa}%`);
      });
      if (page) {
        return query.fetchPage({
          page,
          pageSize: size,
          withRelated: relacionamentos,
        });
      }
      return query.fetchAll();
    },
    async obterPorId(id) {
      return this.forge({ id: id }).fetch();
    },
    async obterPorIdComRelacionamentos(id) {
      const relacionamentos = this.withRelated;
      return this.forge({ id: id }).fetch({ withRelated: relacionamentos });
    },
  },
);

module.exports = Filmes;
