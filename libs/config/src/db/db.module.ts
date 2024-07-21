import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config.service';
import { DbConfigType } from '@app/global/enum';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getDbConfigData(DbConfigType.REMOTE)),
  ],
})
export class DbModule {}
