import 'express-async-errors';
import http from 'node:http';
import path from 'node:path';

import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';

import { errorHandler } from './middlewares/error-handler';
import { router } from './router';

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/tmp', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(router);

app.use(errorHandler);
