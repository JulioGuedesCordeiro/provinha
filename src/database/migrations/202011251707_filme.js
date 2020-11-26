exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('filme', function(table) {
      table.increments('id');
      table.string('nome_filme', 100).notNullable();
      table.string('descricao', 150).notNullable();    
      table.string('diretor', 150);
      table.string('genero', 100);
      table.enu('situacao', ['ATIVO', 'INATIVO']).notNullable().defaultTo('ATIVO');
      table.boolean('deletado').notNullable().defaultTo(false);
      table.timestamp('deletado_em');
      table.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
      table.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
      table.charset('utf8');
      table.engine('InnoDB');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('filme')]);
};

exports.configuration = { transaction: true };
