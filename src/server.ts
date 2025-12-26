import { buildApp } from './app';
import { v1Routes } from './api/v1';

const app = buildApp();

async function start() {
  try {
    await app.ready();

    await app.listen({ port: app.config.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();