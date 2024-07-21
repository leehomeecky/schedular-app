import { createZodDto } from 'nestjs-zod';
import { createScheduleSchema } from '../schedule.schema';
import { idValidationSchema } from '../common.schema';

export class GetScheduleDto extends createZodDto(idValidationSchema) {}
export class CreateScheduleDto extends createZodDto(createScheduleSchema) {}
