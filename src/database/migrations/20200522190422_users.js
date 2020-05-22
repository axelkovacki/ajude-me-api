exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name', 200).notNullable();
    table.string('username', 50).notNullable();
    table.string('password', 200).notNullable();
    table.string('email', 100);
    table.string('cpf');
    table.string('cnpj');
    table.integer('type').notNullable();
    table.string('phone');
    table.string('adress');
    table.integer('credit').notNullable();
    table.string('access_token', 200);
    table.integer('status').defaultTo(1).notNullable();
    table.timestamps(false, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
