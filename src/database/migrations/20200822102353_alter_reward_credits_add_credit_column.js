
exports.up = function(knex) {
  return knex.schema.table('reward_credits', function (table) {
    table.integer('credit').notNullable().after('reward_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('reward_credits', function (table) {
    table.dropColumn('credit');
  });
};
