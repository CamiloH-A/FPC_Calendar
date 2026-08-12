import type { FastifyInstance } from 'fastify';

import { ApiError } from '../../shared/errors/api-error.js';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError) {
      request.log.error(
        {
          errorCode: error.code,
          errorMessage: error.message,
        },
        'API error',
      );

      return reply.status(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    request.log.error(error, 'Unhandled application error');

    return reply.status(500).send({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  });
}
