require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.user,
    "password": process.env.clave,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": "mysql",
    // "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "C0ntr@s3n@",
    "database": "api_escuela",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": "C0ntr@s3n@",
    "database": "api_escuela",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
};
