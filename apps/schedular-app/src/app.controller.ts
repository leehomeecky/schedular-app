import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateScheduleDto,
  GetScheduleDto,
} from '@app/global/schema/dto/schedule.dto';
import { SuccessMessageEnum } from '@app/global/enum';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('jobs')
  async createJobSchedule(
    @Req() req: Request,
    @Res() resp: Response,
    @Body() body: CreateScheduleDto,
  ) {
    await this.appService.createJobSchedule(body);

    resp.json({
      message: SuccessMessageEnum.CONTROLLER_MESSAGE,
      code: 0,
    });
  }

  @Get('jobs')
  async getJobScheduleList(@Req() req: Request, @Res() resp: Response) {
    const schedules = await this.appService.getJobScheduleList();

    resp.json({
      schedules,
      message: SuccessMessageEnum.CONTROLLER_MESSAGE,
      code: 0,
    });
  }

  @Get('jobs/:id')
  async getJobSchedule(
    @Req() req: Request,
    @Param() param: GetScheduleDto,
    @Res() resp: Response,
  ) {
    const schedule = await this.appService.getJobSchedule(param);

    resp.json({
      schedule,
      message: SuccessMessageEnum.CONTROLLER_MESSAGE,
      code: 0,
    });
  }
}
