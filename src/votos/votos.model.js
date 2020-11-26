var bookshelf = require('../db');

const Filmes = require('../filmes/filmes.model');

var Votos = bookshelf.Model.extend(
  {
    tableName: 'voto',
    filme() {
        return this.belongsTo(Filmes, 'id');
      },
  },
  {
  },
);

module.exports = Votos;
