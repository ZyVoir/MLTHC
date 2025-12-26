import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string,
      PORT: number,
      NODE_ENV: string,
      BASE_URL: string,
    }
    prisma: PrismaClient
  }
}
