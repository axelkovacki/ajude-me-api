exports.up = function(knex) {
  return knex.schema.createTable('reward_categories', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.integer('status').defaultTo(1).notNullable();
    table.timestamps(false, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reward_categories');
};
