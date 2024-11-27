// require('dotenv').config()

console.log(process.env.DB_HOST, process.env.DB_HOST);

const db_info = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

module.exports = { db_info };
