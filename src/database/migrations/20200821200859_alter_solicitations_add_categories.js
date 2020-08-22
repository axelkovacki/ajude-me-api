
exports.up = function(knex) {
  return knex.schema.table('solicitations', function (table) {
    table.integer('category_id').unsigned().notNullable().after('id')
    table.foreign('category_id').references('solicitation_categories.id')
  });
};

exports.down = function(knex) {
  return knex.schema.table('solicitations', function (table) {
    table.dropForeign('category_id')
    table.dropColumn('category_id')
  });
};
