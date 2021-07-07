import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { writeFileSync } from 'fs';
import { existsSync, mkdirSync } from 'fs';

const logPath = './logs/';

if (!existsSync(logPath)) {
  mkdirSync(logPath);
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url, body } = req;
    const { statusCode } = res;
    const now = Date.now();

    const message = `method: ${method} url: ${url} ${
      Date.now() - now
    }ms params: ${JSON.stringify(req.params)} query: ${JSON.stringify(
      req.query,
    )} body: ${JSON.stringify(body)} statusCode: ${statusCode}`;

    writeFileSync(`${logPath}out.log`, `\n ${message}`, { flag: 'a' });

    return next
      .handle()
      .pipe(tap(() => Logger.log(message, 'LoggingInterceptor')));
  }
}
