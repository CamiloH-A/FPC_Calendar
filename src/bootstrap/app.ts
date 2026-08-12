import Fastify, { type FastifyInstance } from 'fastify';

import { environment } from '../infrastructure/config/environment.js';
import { healthRoute } from '../presentation/routes/health.route.js';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: {
      level: environment.LOG_LEVEL,
    },
  });

  app.register(healthRoute);

  return app;
}
