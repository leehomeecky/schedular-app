import { SERVICE_CMD, SERVICE_TRS } from '@app/global/constant';
import { outputError } from '@app/global/errors';
import { CreateScheduleDto, GetScheduleDto } from '@app/global/schema/dto';
import { sendSvcRequest } from '@app/utils';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject(SERVICE_TRS.SCHEDULER_SVC)
    private readonly scheduleSvcClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createJobSchedule(data: CreateScheduleDto) {
    try {
      await sendSvcRequest(
        this.scheduleSvcClient,
        SERVICE_CMD.SCHEDULE.CREATE,
        data,
      );
    } catch (error) {
      outputError(error);
    }
  }

  async getJobScheduleList() {
    try {
      const schedules = await sendSvcRequest(
        this.scheduleSvcClient,
        SERVICE_CMD.SCHEDULE.GET_LIST,
      );

      return schedules;
    } catch (error) {
      outputError(error);
    }
  }

  async getJobSchedule(data: GetScheduleDto) {
    try {
      const schedule = await sendSvcRequest(
        this.scheduleSvcClient,
        SERVICE_CMD.SCHEDULE.GET,
        data,
      );

      return schedule;
    } catch (error) {
      outputError(error);
    }
  }
}
