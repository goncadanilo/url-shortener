import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import HttpError from '@shared/errors/HttpError';
import routes from '@shared/infra/http/routes';
import docsFolder from '@config/docs';

import '@shared/infra/mongodb';
import '@shared/containers';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/docs', express.static(docsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HttpError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
