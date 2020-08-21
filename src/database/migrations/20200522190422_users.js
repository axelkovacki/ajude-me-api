exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name', 200).notNullable();
    table.string('password', 200).notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('cpf');
    table.string('cnpj');
    // 1 - Ongs, 2 - Partners, 3 - Consumers Users
    table.integer('type').notNullable();
    table.integer('supporter').defaultTo(0).notNullable();
    table.string('phone');
    table.string('address');
    table.string('link');
    table.string('facebook');
    table.string('instagram');
    table.string('email');
    table.string('image');
    table.integer('credit').notNullable();
    table.string('access_token', 200);
    table.integer('status').defaultTo(1).notNullable();
    table.timestamps(false, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
