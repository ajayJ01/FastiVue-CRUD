const userController = require('../controllers/userController')
const { getUserByIdSchema } = require('../schemas/userSchema');

async function userRoutes(fastify, options) {
  fastify.get('/users', userController.getUsers)
  fastify.get('/users/:id', {schema: getUserByIdSchema, handler: userController.getUserById})
  fastify.post('/users', userController.createUser)
  fastify.put('/users/:id', userController.updateUser)
  fastify.delete('/users/:id', userController.deleteUser)
}

module.exports = userRoutes
