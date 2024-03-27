import 'express-async-errors';
import http from 'node:http';
import path from 'node:path';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';

import { AppError } from './errors/app-error';
import { router } from './router';

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/tmp', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);

    return response.sendStatus(500);
  },
);
