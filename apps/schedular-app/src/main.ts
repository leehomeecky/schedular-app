import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  httpExceptionFilter,
  rpcExceptionFilter,
  zodExceptionFilter,
} from '@app/global/errors';
import { PORT } from '@app/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    httpExceptionFilter,
    zodExceptionFilter,
    rpcExceptionFilter,
  );

  const config = new DocumentBuilder()
    .setTitle('Schedular-App')
    .setDescription(
      'A scheduling API for customized jobs with flexibility in configuration',
    )
    .setVersion('1.0')
    .addTag('Schedular')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  await app.listen(+PORT || 3000);
}
bootstrap();
