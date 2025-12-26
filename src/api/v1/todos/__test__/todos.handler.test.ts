import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../../../../app.ts'; // Ensure the .ts extension is there for ESM
import { HttpStatus } from '../../../../constant/http-status.ts';

describe('Todo Routes - Sequential Lifecycle (POST -> GET -> DELETE)', () => {
    let app: FastifyInstance;
    let createdTodoId: number;

    beforeAll(async () => {
        app = await buildApp();
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('1. should create a todo and store the ID', async () => {
        const payload = { title: 'Lifecycle Test Task' };

        const response = await app.inject({
            method: 'POST',
            url: '/v1/todos',
            payload
        });

        const body = JSON.parse(response.payload);
        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(body).toHaveProperty('id');

        // Save ID for the next tests
        createdTodoId = body.id;
    });

    it('2. should fetch the created todo by ID', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/v1/todos/${createdTodoId}`
        });

        const body = JSON.parse(response.payload);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(body.id).toBe(createdTodoId);
        expect(body.title).toBe('Lifecycle Test Task');
    });

    it('3. should delete the existing todo', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/v1/todos/${createdTodoId}`
        });

        const body = JSON.parse(response.payload);
        expect(response.statusCode).toBe(HttpStatus.OK);

        expect(body.message).toContain(`${createdTodoId}`);
    });

    it('4. should verify the deleted todo no longer appears in GET by ID', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/v1/todos/${createdTodoId}`
        });

        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
});

describe('Todo Routes - Resource Not Found (PUT/DELETE)', () => {
    let app: FastifyInstance;
    const NON_EXISTENT_ID = -1;

    beforeAll(async () => {
        app = await buildApp();
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return 404 when trying to UPDATE a non-existent todo', async () => {
        const response = await app.inject({
            method: 'PUT',
            url: `/v1/todos/${NON_EXISTENT_ID}`,
            payload: {
                title: 'Updating something that is not there'
            }
        });

        const body = JSON.parse(response.payload);

        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
        // This verifies your TodoNotFoundResponse(id) helper is working
        expect(body.message).toBe(`Todo with ID ${NON_EXISTENT_ID} not found`);
    });

    it('should return 404 when trying to DELETE a non-existent todo', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/v1/todos/${NON_EXISTENT_ID}`
        });

        const body = JSON.parse(response.payload);

        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
        expect(body.message).toBe(`Todo with ID ${NON_EXISTENT_ID} not found`);
    });
});