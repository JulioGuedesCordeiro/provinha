exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ator', function(table) {
      table.increments('id');
      table.string('nome', 100).notNullable();
      //VOU ESTABELECER QUE UM ATOR TEM APENAS UM FILME POR SER UMA PROVA DE RESOLUÇÃO RAPIDA
      //MAS O CERTO SERIA UM ATOR PARA MUITOS FILMES
      table.integer('filme_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('filme');
      table.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
      table.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
      table.charset('utf8');
      table.engine('InnoDB');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('ator')]);
};

exports.configuration = { transaction: true };
