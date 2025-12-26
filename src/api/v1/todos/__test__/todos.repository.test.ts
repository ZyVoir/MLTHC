import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../../../app';

describe('TodoRepository', () => {
    let app: any;

    beforeAll(async () => {
        app = await buildApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should only return todos where deletedAt is null', async () => {
        const activeTodo = await app.repos.todo.createTodo({
            title: 'Active Task',
        });

        const deletedTodo = await app.repos.todo.createTodo({
            title: 'Deleted Task',
        });

        await app.repos.todo.deleteTodo(deletedTodo.id);

        const results = await app.repos.todo.findAllTodos();

        const containsDeleted = results.some((t: any) => t.id === deletedTodo.id);
        expect(containsDeleted).toBe(false);
        expect(results.length).toBeGreaterThanOrEqual(1);
    });
});