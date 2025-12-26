import { Type } from "@sinclair/typebox";
import { HttpStatus } from "../../../constant/http-status";
import { TodoListResponse, TodoResponse } from "./todos.response";
import { TodoBodyRequest } from "./todos.request";

export const GetTodosSchema = {
    summary: 'Get all todos',
    description: 'Returns a list of todos',
    response: {
        [HttpStatus.OK]: TodoListResponse,
    },
}

export const CreateToDoSchema = {
    summary: 'Create a new todo',
    description: 'Creates a new todo item',
    body: TodoBodyRequest,
    response: {
        [HttpStatus.CREATED]: TodoResponse,
    },
}

export const GetToDoByIdSchema = {
    summary: 'Get a todo by ID',
    description: 'Returns a single todo item by its ID',
    params: Type.Object({
        id: Type.Number(),
    }),
    response: {
        [HttpStatus.OK]: TodoResponse,
        [HttpStatus.NOT_FOUND]: Type.Object({
            message: Type.String(),
        }),
    },
}

export const UpdateToDoSchema = {
    summary: 'Update a todo by ID',
    description: 'Updates a todo item by its ID',
    params: Type.Object({
        id: Type.Number(),
    }),
    body: Type.Partial(TodoBodyRequest),
    response: {
        [HttpStatus.OK]: TodoResponse,
        [HttpStatus.NOT_FOUND]: Type.Object({
            message: Type.String(),
        }),
    },
}

export const DeleteToDoSchema = {
    summary: 'Delete a todo by ID',
    description: 'Deletes a todo item by its ID',
    params: Type.Object({
        id: Type.Number(),
    }),
    response: {
        [HttpStatus.OK]: Type.Object({
            message: Type.String(),
        }),
        [HttpStatus.NOT_FOUND]: Type.Object({
            message: Type.String(),
        }),
    },
}