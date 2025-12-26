import Fastify from 'fastify';
import env from '@fastify/env';

import { envSchema } from './config/env';
import prisma from './plugins/prisma';
import swagger from './plugins/swagger';
import repositories from './plugins/repositories';
import { v1Routes } from './api/v1';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(env, {
    schema: envSchema,
    dotenv: true,
  });

  app.register(prisma);

  app.register(repositories);

  app.register(swagger);

  app.register(v1Routes, { prefix: '/v1' });

  return app;
}
