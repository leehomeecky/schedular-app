import { IntervalType, ScheduleType } from '@app/global/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  constructor(data: Schedule) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @Column({ type: 'simple-array' })
  destinationEmail?: string[];

  @Column({ type: 'enum', enum: ScheduleType })
  scheduleType?: ScheduleType;

  @Column({ type: 'enum', enum: IntervalType, nullable: true })
  intervalType?: IntervalType;

  @Column({ type: 'int', nullable: true })
  interval?: number;

  @Column({ type: 'timestamp' })
  jobStart?: Date;

  @Column({ type: 'timestamp', nullable: true })
  jobEnd?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
