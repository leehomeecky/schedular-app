import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { RpcError } from '@app/global/interface/common.interface';

@Catch(RpcException)
class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const error = exception.getError() as RpcError;

    const message = error.message;
    const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      message,
      statusCode,
      path: request.url,
    });

    return throwError(() => exception.getError());
  }
}

export const rpcExceptionFilter = new ExceptionFilter();
