import 'dotenv/config';
import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().int().min(1).max(65535),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  CACHE_TTL_SECONDS: z.coerce.number().int().positive(),
});

export const environment = environmentSchema.parse(process.env);

export type Environment = z.infer<typeof environmentSchema>;
