exports.up = function(knex) {
  return knex.schema.createTable('solicitation_credits', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('user_depositor_id').unsigned().notNullable();
    table.foreign('user_depositor_id').references('users.id');
    table.integer('user_receiving_id').unsigned().notNullable();
    table.foreign('user_receiving_id').references('users.id');
    table.integer('solicitation_id').unsigned().notNullable();
    table.foreign('solicitation_id').references('solicitations.id');
    table.timestamps(false, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('solicitation_credits');
};
