import { writeFileSync } from 'fs';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { finished } from 'stream';
import * as fs from 'fs';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import './errorHandler';

const logPath = './log/';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  const { method, url, body } = req;
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  finished(res, () => {
    const { statusCode } = res;
    writeFileSync(`${logPath}out.log`, `\n method: ${method} url: ${url} params: ${JSON.stringify(req.params)} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(body)} statusCode: ${statusCode}`, { flag: 'a' });
    console.log(`method: ${method} url: ${url} params: ${JSON.stringify(req.params)} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(body)} statusCode: ${statusCode}`);
  });
  next();
});

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    writeFileSync(`${logPath}error.log`, `\nCatch error: ${err.message}`, { flag: 'a' });
    console.error(`Catch error: ${err.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    next();
});
export default app;
