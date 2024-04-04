import 'express-async-errors';
import http from 'node:http';
import path from 'node:path';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import swaggerUI from 'swagger-ui-express';
import { ZodError } from 'zod';

import swaggerDocument from '../swagger.json';

import { AppError } from './errors/app-error';
import { router } from './router';

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(router);
app.use('/tmp', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return response
        .status(400)
        .json({ message: 'Validation error', issues: error.format() });
    }

    console.error(error);

    return response.sendStatus(500);
  },
);
