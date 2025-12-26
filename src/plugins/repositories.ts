import fp from 'fastify-plugin';
import { TodoRepository } from '../api/v1/todos/todos.repository';

export default fp(async (app) => {
    app.decorate('repos', {
        todo: new TodoRepository(app.prisma),
    });
});

declare module 'fastify' {
    interface FastifyInstance {
        repos: {
            todo: TodoRepository;
        }
    }
}