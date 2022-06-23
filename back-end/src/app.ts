import express from 'express';

import { ErrorHandler } from './middleware/ErrorHandler';

import { router } from './routes';

const app = express();

app.use('/api/v1', express.json(), router);
app.use(ErrorHandler.handler);

export { app };
