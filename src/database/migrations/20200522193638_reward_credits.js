exports.up = function(knex) {
  return knex.schema.createTable('reward_credits', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('user_depositor_id').unsigned().notNullable();
    table.foreign('user_depositor_id').references('users.id');
    table.integer('user_receiving_id').unsigned().notNullable();
    table.foreign('user_receiving_id').references('users.id');
    table.integer('reward_id').unsigned().notNullable();
    table.foreign('reward_id').references('rewards.id');
    table.timestamps(false, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reward_credits');
};
