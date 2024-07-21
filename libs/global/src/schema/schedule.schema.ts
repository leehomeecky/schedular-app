import { z } from 'zod';
import * as moment from 'moment';
import {
  futureDate,
  intervalTypeValidation,
  scheduleTypeValidation,
  stringToDate,
  stringToInt,
} from './common.schema';
import { ScheduleType } from '../enum';

export const createScheduleSchema = z
  .object({
    name: z.string(),
    note: z.string().optional(),
    scheduleType: scheduleTypeValidation,
    startDate: stringToDate.and(futureDate),
    destinationEmail: z.string().email().array(),
    intervalType: intervalTypeValidation.optional(),
    interval: z.number().or(stringToInt).optional(),
    endDate: stringToDate.and(futureDate).optional(),
  })
  .refine(
    ({ startDate, endDate }) => {
      if (endDate) moment(endDate).isAfter(moment(startDate), 'day');
      return true;
    },
    {
      message: 'startDate must be before endDate',
    },
  )
  .refine(
    ({ interval, scheduleType }) => {
      if (scheduleType === ScheduleType.PERIODIC) return !!interval;
      return true;
    },
    {
      message: 'interval is required',
    },
  )
  .refine(
    ({ intervalType, scheduleType }) => {
      if (scheduleType === ScheduleType.PERIODIC) return !!intervalType;
      return true;
    },
    {
      message: 'intervalType is required',
    },
  );
