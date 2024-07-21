import { Module } from '@nestjs/common';
import { SchedularSvcController } from './schedular-svc.controller';
import { SchedularSvcService } from './schedular-svc.service';
import { DbModule } from '@app/config/db/db.module';
import { RmqModule } from '@app/config/rmq/rmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '@app/global/model/entity';
import { RmqService } from '@app/config/rmq/rmq.service';
import { ScheduleRepository } from '@app/global/model/repository';
import { RedisModule } from '@app/config/redis/redis.module';
import { QueueModule } from '@app/config/queue/queue.module';

@Module({
  imports: [
    DbModule,
    RmqModule,
    RedisModule,
    QueueModule,
    TypeOrmModule.forFeature([Schedule]),
  ],
  controllers: [SchedularSvcController],
  providers: [SchedularSvcService, RmqService, ScheduleRepository],
})
export class SchedularSvcModule {}
