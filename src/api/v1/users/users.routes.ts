import { FastifyInstance } from 'fastify'
import { ApiTag } from '../../../constant/api-tags';

export async function usersRoute(app: FastifyInstance) {

  app.addHook('onRoute', (routeOptions) => {
    routeOptions.schema = {
      ...routeOptions.schema,
      tags: [ApiTag.USERS],
    };
  });

  app.get('/', async () => {
    return { ok: true }
  })
}