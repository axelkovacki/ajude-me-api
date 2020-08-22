
exports.up = function(knex) {
  return knex.schema.table('solicitation_credits', function (table) {
    table.integer('credit').notNullable().after('solicitation_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('solicitation_credits', function (table) {
    table.dropColumn('credit');
  });
};
