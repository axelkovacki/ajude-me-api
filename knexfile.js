const path = require('path');

// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'ajude_me',
      user: 'root',
      password: '.01Suporte',
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};
