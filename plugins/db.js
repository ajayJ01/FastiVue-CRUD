const fp = require('fastify-plugin');
const mysql = require('mysql2/promise');

async function dbConnector(fastify, options) {
  const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fastifydb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  fastify.decorate('mysql', connection);
}

module.exports = fp(dbConnector);