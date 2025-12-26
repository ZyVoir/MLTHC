import { Type, Static } from '@sinclair/typebox';

export const TodoBodyRequest = Type.Object({
    title: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Enum({ LOW: 'LOW', MEDIUM: 'MEDIUM', HIGH: 'HIGH' })),
    dueDate: Type.Optional(Type.String({ format: 'date-time' }))
});

export type TodoInput = Static<typeof TodoBodyRequest>;