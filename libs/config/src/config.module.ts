import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DbModule } from './db/db.module';
import { RedisModule } from './redis/redis.module';
import { RmqModule } from './rmq/rmq.module';
import { QueueModule } from './queue/queue.module';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [DbModule, RedisModule, RmqModule, QueueModule],
})
export class ConfigModule {}
