import { DbConfigType } from '@app/global/enum';
import { Schedule } from '@app/global/model/entity';
import { Injectable } from '@nestjs/common';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

@Injectable()
export class ConfigService {
  static getDbConfigData(configType: DbConfigType = DbConfigType.LOCAL) {
    const {
      DB_PORT,
      DB_SYNC,
      DB_HOST: host,
      DB_NAME: database,
      DB_USER: username,
      DB_PASSWORD: password,
      DB_ENDPOINT_ID: ENDPOINT_ID,
    } = process.env;

    const dbConfig = {
      host,
      password,
      username,
      database,
      port: +DB_PORT,
      logging: false,
      type: 'postgres',
      entities: [Schedule],
      options: { encrypt: false },
      synchronize: DB_SYNC === 'true' || false,
      debug: process.env.ALLOW_TYPEORM_DEBUG === 'true',
    };

    if (configType === DbConfigType.REMOTE) {
      dbConfig['ssl'] = true;
      dbConfig['extra'] = { ssl: { rejectUnauthorized: false } };
      dbConfig['connection'] = { options: `project=${ENDPOINT_ID}` };
    }

    return dbConfig as TypeOrmModuleOptions;
  }

  static getRedisConfigData() {
    const {
      REDIS_PORT,
      REDIS_HOST: host,
      REDIS_PASSWORD: password,
      REDIS_USERNAME: username,
    } = process.env;

    const redisConfig = {
      host,
      password,
      username,
      port: +REDIS_PORT,
    };

    return redisConfig;
  }

  static getRmqQueueName(name: string): string {
    const querName = process.env[`RMQ_${name}_QUEUE`];
    return querName;
  }

  static transportClientModuleOptions = (
    names: string[],
  ): ClientsModuleOptions => {
    const { RABBITMQ_URL } = process.env;

    const options: ClientsModuleOptions = names.map((name) => ({
      name,
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queueOptions: { messageTtl: 50000 },
        queue: ConfigService.getRmqQueueName(name),
      },
    }));

    return options;
  };
}
