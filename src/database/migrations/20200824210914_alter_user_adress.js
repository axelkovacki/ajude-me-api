
exports.up = function(knex) {
  return knex.schema.table('users', function (table) {
    table.string('cep').notNullable().after('address');
    table.string('city').notNullable().after('cep');
    table.string('uf').notNullable().after('city');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('adress');
    table.dropColumn('cep');
    table.dropColumn('city');
  });
};
