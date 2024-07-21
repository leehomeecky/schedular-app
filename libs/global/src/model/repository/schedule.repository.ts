import { Injectable } from '@nestjs/common';
import { AbstractRepository } from './abstract.repository';
import { DataSource } from 'typeorm';
import { Schedule } from '../entity';

@Injectable()
export class ScheduleRepository extends AbstractRepository<Schedule> {
  constructor(private dataSource: DataSource) {
    super(Schedule, dataSource);
  }
}
