import { NestFactory } from '@nestjs/core';
import { SchedularSvcModule } from './schedular-svc.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RmqService } from '@app/config/rmq/rmq.service';
import { SERVICE_TRS } from '@app/global/constant';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      SchedularSvcModule,
      RmqService.getOptions(SERVICE_TRS.SCHEDULER_SVC),
    );
    await app.listen();
  } catch (error) {
    Logger.error('Error during svc-auth startup:', error);
    process.exit(1);
  }
}
bootstrap();
