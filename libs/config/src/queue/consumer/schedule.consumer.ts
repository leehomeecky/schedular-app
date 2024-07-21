import { QUEUE_NAME, QUEUE_PROCESS_NAME } from '@app/global/constant';
import { ScheduleRepository } from '@app/global/model/repository';
import { sendMail } from '@app/utils';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { DoneCallback, Job, Queue } from 'bull';
import * as moment from 'moment';

@Processor(QUEUE_NAME.JOB_SCHEDULE_QUEUE)
export class ScheduleConsumer {
  constructor(
    @InjectQueue(QUEUE_NAME.JOB_SCHEDULE_QUEUE)
    private readonly scheduleQueue: Queue,
    private readonly scheduleRepo: ScheduleRepository,
  ) {}

  @Process(QUEUE_PROCESS_NAME.PERIODIC_JOB_PROCESS)
  async periodicJobProcessor(
    job: Job<{
      id: number;
    }>,
    done: DoneCallback,
  ) {
    await job.progress(0);
    const { id } = job.data;

    try {
      const schedule = await this.scheduleRepo.findOne({ where: { id } });
      if (!schedule) return;
      const { name, note, interval, intervalType, jobEnd, destinationEmail } =
        schedule;
      const nextRunTime = moment().add(interval, intervalType);

      const isActive = jobEnd ? nextRunTime.isBefore(moment(jobEnd)) : true;
      const delay = nextRunTime.diff(moment.now());

      await sendMail(destinationEmail, name, { text: note });
      if (isActive)
        await this.scheduleQueue.add(
          QUEUE_PROCESS_NAME.PERIODIC_JOB_PROCESS,
          { id },
          {
            delay,
            removeOnComplete: true,
          },
        );

      await job.progress(100);
    } catch (error) {
      Logger.error(`QUEUE JOB ERROR: ${error}`);
      job.progress(100);
    }

    done();
  }

  @Process(QUEUE_PROCESS_NAME.ONE_OFF_JOB_PROCESS)
  async oneOffJobProcessor(
    job: Job<{
      id: number;
    }>,
    done: DoneCallback,
  ) {
    await job.progress(0);
    const { id } = job.data;

    try {
      const schedule = await this.scheduleRepo.findOne({ where: { id } });
      if (!schedule) return;

      const { name, note, destinationEmail } = schedule;
      await sendMail(destinationEmail, name, { text: note });

      await job.progress(100);
    } catch (error) {
      Logger.error(`QUEUE JOB ERROR: ${error}`);
      job.progress(100);
    }

    done();
  }
}
