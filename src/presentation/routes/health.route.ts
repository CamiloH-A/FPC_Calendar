import type { FastifyInstance } from 'fastify';

export function healthRoute(app: FastifyInstance): void {
  app.get('/health', () => {
    return {
      status: 'UP',
    };
  });
}
