import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  converter(valor: number, de: string, para: string): number {
    // Taxas fixas baseadas no BRL como referência
    const taxas: { [key: string]: number } = {
      BRL: 1.0,
      USD: 5.0, // Exemplo: 1 USD = 5 BRL
      EUR: 5.5, // Exemplo: 1 EUR = 5.5 BRL
    };

    if (!taxas[de] || !taxas[para]) {
      throw new Error('Moeda não suportada');
    }

    // Converte para BRL primeiro, depois para a moeda de destino
    const valorEmBrl = valor * taxas[de];
    const resultado = valorEmBrl / taxas[para];

    return Number(resultado.toFixed(2));
  }
}