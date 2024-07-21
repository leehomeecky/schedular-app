import { QUEUE_NAME, QUEUE_PROCESS_NAME } from '@app/global/constant';
import { ScheduleType } from '@app/global/enum';
import { throwRpcError } from '@app/global/errors';
import { Schedule } from '@app/global/model/entity';
import { ScheduleRepository } from '@app/global/model/repository';
import { CreateScheduleDto } from '@app/global/schema/dto/schedule.dto';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import * as moment from 'moment';

@Injectable()
export class SchedularSvcService {
  constructor(
    @InjectQueue(QUEUE_NAME.JOB_SCHEDULE_QUEUE)
    private readonly scheduleQueue: Queue,
    private readonly scheduleRepo: ScheduleRepository,
  ) {}

  async createJobSchedule(data: CreateScheduleDto) {
    try {
      const {
        name,
        note,
        endDate,
        startDate,
        interval,
        intervalType,
        scheduleType,
        destinationEmail,
      } = data;

      const scheduleData: Schedule = {
        name,
        note,
        interval,
        intervalType,
        scheduleType,
        jobEnd: endDate,
        destinationEmail,
        jobStart: startDate,
      };
      const ttl = moment(startDate).diff(moment.now());
      const schedule = await this.scheduleRepo.save(scheduleData);
      await this.queueSchedule({ scheduleId: schedule.id, scheduleType, ttl });
    } catch (error) {
      throwRpcError(error);
    }
  }

  async queueSchedule(data: {
    ttl: number;
    scheduleId: number;
    scheduleType: ScheduleType;
  }) {
    const { ttl: delay, scheduleId: id, scheduleType } = data;
    const queueData = { id };
    const queueProcessName =
      scheduleType === ScheduleType.ONE_OFF
        ? QUEUE_PROCESS_NAME.ONE_OFF_JOB_PROCESS
        : QUEUE_PROCESS_NAME.PERIODIC_JOB_PROCESS;
    await this.scheduleQueue.add(queueProcessName, queueData, {
      delay,
      removeOnComplete: true,
    });
  }
}
