import type { FastifyInstance } from 'fastify';

import { environment } from '../infrastructure/config/environment.js';

export async function startServer(app: FastifyInstance): Promise<void> {
  try {
    await app.listen({
      host: '0.0.0.0',
      port: environment.PORT,
    });

    app.log.info(`FPC Calendar API running on port ${environment.PORT}`);
  } catch (error) {
    app.log.error(error, 'Failed to start server');

    process.exit(1);
  }
}

export async function stopServer(app: FastifyInstance): Promise<void> {
  app.log.info('Stopping FPC Calendar API...');

  await app.close();

  app.log.info('FPC Calendar API stopped');
}
