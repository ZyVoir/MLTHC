import { RouteHandler } from 'fastify';
import { HttpStatus } from '../../../constant/http-status';
import { TodoInput } from './todos.request';
import { TodoDeletionResponse, TodoNotFoundResponse } from './todos.response';

export const getTodosHandler: RouteHandler = async (request, reply) => {
    const repo = request.server.repos.todo;

    const todos = await repo.findAllTodos();
    return todos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
        dueDate: todo.dueDate?.toISOString() || null,
    }));
}

export const createTodoHandler: RouteHandler = async (request, reply) => {
    const repo = request.server.repos.todo;

    const newTodo = await repo.createTodo(request.body as TodoInput);

    reply.code(HttpStatus.CREATED);
    return {
        ...newTodo,
        createdAt: newTodo.createdAt.toISOString(),
        updatedAt: newTodo.updatedAt.toISOString(),
        dueDate: newTodo.dueDate?.toISOString() || null,
    };
}

export const getTodoByIdHandler: RouteHandler = async (request, reply) => {
    const repo = request.server.repos.todo;
    const { id } = request.params as { id: number };

    const todo = await repo.findById(id);

    if (!todo) {
        reply.code(HttpStatus.NOT_FOUND);
        return TodoNotFoundResponse(id);
    }

    return {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
        dueDate: todo.dueDate?.toISOString() || null,
    };
}

export const updateTodoHandler: RouteHandler = async (request, reply) => {
    const repo = request.server.repos.todo;
    const { id } = request.params as { id: number };

    const updateData = request.body as Partial<TodoInput>;

    const existingTodo = await repo.findById(id);
    if (!existingTodo) {
        reply.code(HttpStatus.NOT_FOUND);
        return TodoNotFoundResponse(id);
    }

    const updatedTodo = await repo.updateTodo(id, updateData);

    return {
        ...updatedTodo,
        createdAt: updatedTodo.createdAt.toISOString(),
        updatedAt: updatedTodo.updatedAt.toISOString(),
        dueDate: updatedTodo.dueDate?.toISOString() || null,
    };
}

export const deleteTodoHandler: RouteHandler = async (request, reply) => {
    const repo = request.server.repos.todo;
    const { id } = request.params as { id: number };

    const existingTodo = await repo.findById(id);
    if (!existingTodo) {
        reply.code(HttpStatus.NOT_FOUND);
        return TodoNotFoundResponse(id);
    }

    await repo.deleteTodo(id);

    reply.code(HttpStatus.OK);
    return TodoDeletionResponse(id);
}