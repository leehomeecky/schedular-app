import { Test, TestingModule } from '@nestjs/testing';
import { SchedularSvcController } from './schedular-svc.controller';
import { SchedularSvcService } from './schedular-svc.service';

describe('SchedularSvcController', () => {
  let schedularSvcController: SchedularSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchedularSvcController],
      providers: [SchedularSvcService],
    }).compile();

    schedularSvcController = app.get<SchedularSvcController>(SchedularSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schedularSvcController.getHello()).toBe('Hello World!');
    });
  });
});
