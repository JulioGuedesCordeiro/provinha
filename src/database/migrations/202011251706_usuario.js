exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('usuario', function(table) {
      table.increments('id');
      table.string('nome', 100).notNullable();
      table.string('email', 150).notNullable().unique();    
      table.string('senha', 150);
      table.string('login', 100);
      table.boolean('isAdmin').notNullable().defaultTo(false);
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
  return Promise.all([knex.schema.dropTable('usuario')]);
};

exports.configuration = { transaction: true };
