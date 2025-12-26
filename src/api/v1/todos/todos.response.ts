import { Type } from '@sinclair/typebox';

export const TodoResponse = Type.Object({
    id: Type.Integer(),
    title: Type.String(),
    description: Type.Optional(Type.String()),
    completed: Type.Boolean(),
    priority: Type.Enum({ LOW: 'LOW', MEDIUM: 'MEDIUM', HIGH: 'HIGH' }),
    dueDate: Type.Optional(Type.String({ format: 'date-time' })),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
});

export const TodoListResponse = Type.Array(TodoResponse);
export type TodoResponseType = typeof TodoResponse;

//Helper Response
export const TodoNotFoundResponse = (id: Number) => ({
    message: `Todo with ID ${id} not found`,
})

export const TodoDeletionResponse = (id: Number) => {
    return {
        message: `Todo with ID ${id} has been deleted`,
    };
}