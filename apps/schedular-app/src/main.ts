import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  httpExceptionFilter,
  rpcExceptionFilter,
  zodExceptionFilter,
} from '@app/global/errors';
import { PORT } from '@app/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    httpExceptionFilter,
    zodExceptionFilter,
    rpcExceptionFilter,
  );
  await app.listen(+PORT || 3000);
}
bootstrap();
