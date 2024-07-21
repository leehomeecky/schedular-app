import { RpcException } from '@nestjs/microservices';
import { RpcError } from '../interface';
import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export const throwRpcError = (error: RpcError) => {
  throw new RpcException(error);
};

export const outputError = (err: {
  error: unknown;
  message?: string;
}): void => {
  const { error, message } = err;
  if (error instanceof HttpException || error instanceof RpcException) {
    throw error;
  }
  Logger.log(error);
  console.log(error);
  throw new InternalServerErrorException(null, message);
};
