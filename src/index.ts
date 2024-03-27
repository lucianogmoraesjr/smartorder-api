import 'express-async-errors';
import http from 'node:http';
import path from 'node:path';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { AppError } from './app/errors/app-error';
import { router } from './router';

const app = express();
app.use(cors());

const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('MongoDB connected successfully');

    app.use(express.json());
    app.use(router);
    app.use('/tmp', express.static(path.resolve(__dirname, '..', 'tmp')));

    app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (error instanceof AppError) {
          return response
            .status(error.statusCode)
            .json({ message: error.message });
        }

        return response.sendStatus(500);
      },
    );

    server.listen(3333, () =>
      console.log('🔥 server running on http://localhost:3333'),
    );
  })
  .catch(() => console.log('Error when trying to connect to MongoDB'));
