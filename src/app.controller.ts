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
    if (!valor || !de || !para) {
      return {
        erro: "Parâmetros incompletos.",
        exemplo: "/converter?valor=100&de=USD&para=BRL"
      };
    }

    const valorNumerico = Number(valor);
    const moedaDe = de.toUpperCase();
    const moedaPara = para.toUpperCase();

    const resultado = this.appService.converter(valorNumerico, moedaDe, moedaPara);

    return {
      valorOriginal: valorNumerico,
      de: moedaDe,
      para: moedaPara,
      resultado,
    };
  }
}