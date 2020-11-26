require('dotenv').config({ path: '.env' });

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  KEY_JWT: process.env.KEY_JWT
};