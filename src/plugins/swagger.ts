import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { TAG_DESCRIPTIONS } from '../constant/api-tags';
import { version } from '../../package.json';

export default fp(async (app) => {

    const serverUrl = app.config.BASE_URL;

    await app.register(swagger, {
        openapi: {
            info: {
                title: 'ML THC API',
                description: 'Fastify + Prisma API',
                version: version,
            },
            servers: [
                { url: serverUrl, description: 'Local Development' },
            ],
            tags: TAG_DESCRIPTIONS
        },
    });

    await app.register(swaggerUI, {
        routePrefix: '/docs',
    });
});
