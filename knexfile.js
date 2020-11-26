require('dotenv').config()
const env = require('./src/env');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: env.database.host,
      database: env.database.dbName,
      user: env.database.user,
      password: env.database.password,
      insecureAuth: true,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      // lembrar de apagar se eu nao tiver usando
      // mas vou manter aqui por enquanto
      directory: './src/database/seeds',
    },
  },
};
