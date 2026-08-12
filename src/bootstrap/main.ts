import { buildApp } from './app.js';
import { startServer } from './server.js';

const app = buildApp();

await startServer(app);
