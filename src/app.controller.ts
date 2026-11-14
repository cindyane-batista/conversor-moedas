import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('converter')
  converter(
    @Query('valor') valor: string,
    @Query('de') de: string,
    @Query('para') para: string,
  ) {
    const resultado = this.appService.converter(Number(valor), de, para);
    return {
      valorOriginal: Number(valor),
      de,
      para,
      resultado,
    };
  }
}