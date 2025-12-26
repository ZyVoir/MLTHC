import { FastifyInstance } from 'fastify';
import { ApiTag } from '../../../constant/api-tags';

import {
  getTodosHandler,
  createTodoHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler
} from './todos.handler';

import {
  CreateToDoSchema,
  DeleteToDoSchema,
  GetToDoByIdSchema,
  GetTodosSchema,
  UpdateToDoSchema
} from './todos.schema';

export async function todosRoute(app: FastifyInstance) {

  app.addHook('onRoute', (routeOptions) => {
    routeOptions.schema = {
      ...routeOptions.schema,
      tags: [ApiTag.TODOS],
    };
  });

  // Get All Todos
  // /v1/todos
  app.get('/', {
    schema: GetTodosSchema,
    handler: getTodosHandler,
  });

  // Create a new Todo
  // /v1/todos
  app.post('/', {
    schema: CreateToDoSchema,
    handler: createTodoHandler,
  })

  // Get Single Todo by Unique ID
  // /v1/todos/:id
  app.get('/:id', {
    schema: GetToDoByIdSchema,
    handler: getTodoByIdHandler,
  });

  // Update Todo by ID
  // /v1/todos/:id
  app.put('/:id', {
    schema: UpdateToDoSchema,
    handler: updateTodoHandler,
  });

  // Delete Todo by ID
  // /v1/todos/:id
  app.delete('/:id', {
    schema: DeleteToDoSchema,
    handler: deleteTodoHandler,
  });
}
