import { createWriteStream } from 'fs';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { finished } from 'stream';
import morgan from 'morgan';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(morgan('dev', {stream: createWriteStream('./access.log')}))
app.use('/', (req, res, next) => {
  const { method, url, body} = req;
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();

  finished(res, () => {
    const {statusCode} = res;
    console.log(`method: ${method} url: ${url} params: ${JSON.stringify(req.params)} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(body)} statusCode: ${statusCode}`)
  })
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

export default app;
