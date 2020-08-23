exports.up = function(knex) {
  return knex.schema.createTable('rewards', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id')
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('link');
    table.integer('credit').notNullable();
    table.integer('status').defaultTo(1).notNullable();
    table.timestamps(false, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rewards');
};
