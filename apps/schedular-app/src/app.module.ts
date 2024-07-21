import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { RmqModule } from '@app/config/rmq/rmq.module';
import { SERVICE_TRS } from '@app/global/constant';

@Module({
  imports: [RmqModule.register(SERVICE_TRS.SCHEDULER_SVC)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
