import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateScheduleDto } from '@app/global/schema/dto/schedule.dto';
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
}
