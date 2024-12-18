import { Test, TestingModule } from '@nestjs/testing';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';

describe('FacebookController', () => {
  let controller: FacebookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebookController],
      providers: [FacebookService],
    }).compile();

    controller = module.get<FacebookController>(FacebookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
