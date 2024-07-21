import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '../config.service';
import { config } from 'dotenv';
config();

@Injectable()
export class RmqService {
  static getOptions(
    queue: string,
    noAck = false,
    messageTtl = 50000,
  ): RmqOptions {
    const { RABBITMQ_URL } = process.env;
    return {
      transport: Transport.RMQ,
      options: {
        noAck,
        persistent: true,
        urls: [RABBITMQ_URL],
        queueOptions: { messageTtl },
        queue: ConfigService.getRmqQueueName(queue),
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
