import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api.exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        timestamp: new Date().toLocaleString(),
        path: request.url,
        message: exception.getErrorMessage(),
      });
      return;
    }
    response.status(status).json({
      code: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal Server Error',
    });
  }
}
