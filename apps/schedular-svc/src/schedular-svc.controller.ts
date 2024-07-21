import { Controller } from '@nestjs/common';
import { SchedularSvcService } from './schedular-svc.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SuccessMessageEnum } from '@app/global/enum';
import { SERVICE_CMD } from '@app/global/constant';
import { RmqService } from '@app/config/rmq/rmq.service';
import { CreateScheduleDto, GetScheduleDto } from '@app/global/schema/dto';

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

  @MessagePattern(SERVICE_CMD.SCHEDULE.GET_LIST)
  async getJobScheduleList(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    const schedules = await this.schedularSvcService.getJobScheduleList();
    return schedules;
  }

  @MessagePattern(SERVICE_CMD.SCHEDULE.GET)
  async getJobSchedule(
    @Payload() data: GetScheduleDto,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    const schedule = await this.schedularSvcService.getJobSchedule(data.id);
    return schedule;
  }
}
