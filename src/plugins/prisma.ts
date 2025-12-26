import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export default fp(async (app) => {
  const connectionString = app.config.DATABASE_URL;

  const adapter = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter })

  await prisma.$connect();

  app.decorate('prisma', prisma);

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
}, {
  dependencies: ['@fastify/env'],
});