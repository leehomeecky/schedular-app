import { Module } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { QUEUE_NAME } from '@app/global/constant';
import { BullModule } from '@nestjs/bull';
import { ScheduleConsumer } from './consumer/schedule.consumer';
import { ScheduleRepository } from '@app/global/model/repository';

const queuesToRegister = BullModule.registerQueue({
  name: QUEUE_NAME.JOB_SCHEDULE_QUEUE,
});

@Module({
  imports: [
    BullModule.forRoot({
      redis: ConfigService.getRedisConfigData(),
    }),
    queuesToRegister,
  ],
  exports: [queuesToRegister],
  providers: [ScheduleConsumer, ScheduleRepository],
})
export class QueueModule {}
