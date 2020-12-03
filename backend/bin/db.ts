const dotenv = require('dotenv').config();
const pgp = require('pg').Pool;
const { PG_USER, PG_PASSWORD, PG_DATABASE, PG_HOST, PG_PORT } = process.env

module.exports = new pgp({
   user: PG_USER,
   password: PG_PASSWORD,
   database: PG_DATABASE,
   host: PG_HOST,
   port: PG_PORT,
})