/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import swaggerDocs from './utils/swagger';
import createHttpError, { isHttpError } from 'http-errors';
import env from './utils/validate-env';
import routes from './routes';
import { NextFunction } from 'express';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

routes(app);
swaggerDocs(app);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

const PORT = env.PORT;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
