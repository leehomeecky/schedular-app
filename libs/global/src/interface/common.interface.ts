import { HttpStatus } from '@nestjs/common';

export interface RpcError {
  message: string | Record<string, unknown>;
  statusCode: HttpStatus;
}
