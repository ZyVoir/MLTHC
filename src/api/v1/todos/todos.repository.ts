import { PrismaClient } from '@prisma/client';
import { TodoInput } from './todos.request';

export class TodoRepository {
    constructor(private prisma: PrismaClient) { }

    async findAllTodos() {
        return this.prisma.todo.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' }
        });
    }

    async createTodo(data: TodoInput) {
        return this.prisma.todo.create({
            data: {
                ...data,
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
            }
        });
    }

    async findById(id: number) {
        return this.prisma.todo.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
    }

    async updateTodo(id: number, data: Partial<TodoInput>) {
        return this.prisma.todo.update({
            where: { id },
            data: {
                ...data,
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
            }
        });
    }

    async deleteTodo(id: number) {
        return this.prisma.todo.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}