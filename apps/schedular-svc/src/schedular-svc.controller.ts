import { Controller } from '@nestjs/common';
import { SchedularSvcService } from './schedular-svc.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateScheduleDto } from '@app/global/schema/dto/schedule.dto';
import { SuccessMessageEnum } from '@app/global/enum';
import { SERVICE_CMD } from '@app/global/constant';
import { RmqService } from '@app/config/rmq/rmq.service';

@Controller()
export class SchedularSvcController {
  constructor(
    private readonly schedularSvcService: SchedularSvcService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(SERVICE_CMD.SCHEDULE.CREATE)
  async createJobSchedule(
    @Payload() data: CreateScheduleDto,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    await this.schedularSvcService.createJobSchedule(data);
    return SuccessMessageEnum.CONTROLLER_MESSAGE;
  }
}
