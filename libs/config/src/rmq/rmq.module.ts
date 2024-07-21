import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RmqService } from './rmq.service';
import { ConfigService } from '../config.service';

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register(...names: string[]): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.register(
          ConfigService.transportClientModuleOptions(names),
        ),
      ],
      exports: [ClientsModule],
    };
  }
}
