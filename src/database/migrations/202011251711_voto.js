exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('voto', function(table) {
      table.increments('id');
      table.integer('valor');
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
  return Promise.all([knex.schema.dropTable('voto')]);
};

exports.configuration = { transaction: true };
