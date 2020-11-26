const { object } = require('joi');
var bookshelf = require('../db');
var Ator = bookshelf.Model.extend(
  {
    tableName: 'ator',
  },
  {
    async salvar(nome, id, transaction) {
        return this.forge({
            nome,
            filme_id: id
        }).save(null, { transacting: transaction });
    },
  },
);

module.exports = Ator;
