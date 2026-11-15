import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('converter', () => {
    it('deve converter de BRL para USD corretamente', () => {
      const resultado = appController.converter('10', 'BRL', 'USD');
      expect(resultado.resultado).toBe(1.70);
    });

    it('deve converter de USD para BRL corretamente', () => {
      const resultado = appController.converter('10', 'USD', 'BRL');
      expect(resultado.resultado).toBe(58.50);
    });

    it('deve converter de USD para EUR corretamente', () => {
      const resultado = appController.converter('11', 'USD', 'EUR');
      expect(resultado.resultado).toBe(10.23);
    });
  });
});