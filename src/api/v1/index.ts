import { FastifyInstance } from 'fastify';
import { todosRoute } from './todos/todos.routes'
import { usersRoute } from './users/users.routes'

export async function v1Routes(app: FastifyInstance) {
   app.register(todosRoute, { prefix: '/todos' })
   app.register(usersRoute, { prefix: '/users' })
}