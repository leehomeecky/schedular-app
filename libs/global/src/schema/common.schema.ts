import { z } from 'zod';
import * as moment from 'moment';
import { IntervalType, ScheduleType } from '../enum';

export const stringToInt = z.string().transform((value, ctx) => {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'must be a valid number',
    });
  }
  return parsedValue;
});

export const stringToDate = z.string().transform((value, ctx) => {
  const date = moment(value);
  if (!date.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'must be a valid date string',
    });
  }
  return date.toDate();
});

export const futureDate = stringToDate.refine(
  (date) => moment(date).isSameOrAfter(moment(), 'day'),
  {
    message: 'must be greater or equals to today',
  },
);

export const pastDate = stringToDate.refine(
  (date) => moment(date).isSameOrBefore(moment(), 'day'),
  {
    message: 'date must be lesser or equals to today',
  },
);

export const scheduleTypeValidation = z.enum([
  ScheduleType.ONE_OFF,
  ScheduleType.PERIODIC,
]);

export const intervalTypeValidation = z.enum([
  IntervalType.DAY,
  IntervalType.HOUR,
  IntervalType.WEEK,
  IntervalType.MONTH,
  IntervalType.MINUTES,
]);

export const idValidationSchema = z.object({
  id: z.number().or(stringToInt),
});
