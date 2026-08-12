import { buildApp } from './app.js';
import { startServer, stopServer } from './server.js';

const app = buildApp();

let isShuttingDown = false;

const shutdown = async (signal: string): Promise<void> => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  app.log.info(`Received ${signal}`);

  try {
    await stopServer(app);
    process.exit(0);
  } catch (error) {
    app.log.error(error, 'Failed during graceful shutdown');

    process.exit(1);
  }
};

const handleShutdown = (signal: string): void => {
  void shutdown(signal);
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

await startServer(app);
