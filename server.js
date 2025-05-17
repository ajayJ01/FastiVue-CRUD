const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const path = require('path');
const fastifyStatic = require('@fastify/static');
const dbConnector = require('./plugins/db');
const userRoutes = require('./routes/userRoutes');

// Enable CORS first
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// Serve static files from frontend/dist
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'frontend/dist'),
  prefix: '/', // So that /js/app.js etc. are resolved correctly
});

// Root route manually serve index.html
fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
});

// Register DB connector
fastify.register(dbConnector);

// Register routes
fastify.register(userRoutes);

// Start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});