import { writeFileSync } from 'fs';
import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { finished } from 'stream';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';


interface IReason{
  message:string;
}

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

process.on('unhandledRejection', (reason:IReason) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  writeFileSync('./error.log', `Unhandled rejection detected: ${reason.message}`, {flag: 'a'})
});

process.on('uncaughtException', (error:Error) => {
  console.error(`Captured error: ${error.message}`);
  writeFileSync('./error.log', `Captured error: ${error.message}`, {flag: 'a'})
  process.exit(1);
});

app.use('/', (req, res, next) => {
  const { method, url, body} = req;
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  finished(res, () => {
    const {statusCode} = res;
    writeFileSync('./out.log', `\n method: ${method} url: ${url} params: ${JSON.stringify(req.params)} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(body)} statusCode: ${statusCode}`, {flag: 'a'})
    console.log(`method: ${method} url: ${url} params: ${JSON.stringify(req.params)} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(body)} statusCode: ${statusCode}`)
  })
  next();

});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use((err:Error, _req:Request, res:Response) => {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
  writeFileSync('./error.log', `Captured error: ${err.message}`, {flag: 'a'});
});
export default app;
