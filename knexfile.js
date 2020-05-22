const path = require('path');

// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'ajude_me',
      user: 'root',
      password: '123456',
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};
