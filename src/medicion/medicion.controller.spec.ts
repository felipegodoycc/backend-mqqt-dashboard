import { Test, TestingModule } from '@nestjs/testing';
import { MedicionController } from './medicion.controller';

describe('Medicion Controller', () => {
  let controller: MedicionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicionController],
    }).compile();

    controller = module.get<MedicionController>(MedicionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
