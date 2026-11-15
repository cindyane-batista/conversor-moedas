import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppService {
  // Taxas atualizadas para valores mais próximos da realidade
  private taxas: Record<string, Record<string, number>> = {
    USD: { BRL: 5.85, EUR: 0.93, USD: 1 },
    BRL: { USD: 0.17, EUR: 0.16, BRL: 1 },
    EUR: { USD: 1.08, BRL: 6.30, EUR: 1 },
  };

  converter(valor: number, de: string, para: string): number {
    // Valida se as moedas são suportadas
    const moedasSuportadas = ['USD', 'BRL', 'EUR'];
    if (!moedasSuportadas.includes(de) || !moedasSuportadas.includes(para)) {
      throw new BadRequestException(`Moeda não suportada. Use: ${moedasSuportadas.join(', ')}`);
    }

    // Se a moeda de origem e destino forem iguais
    if (de === para) {
      return valor;
    }

    // Conversão simples baseada na tabela de taxas
    const taxa = this.taxas[de]?.[para];
    if (!taxa) {
      throw new BadRequestException(`Taxa de conversão não encontrada para ${de} -> ${para}`);
    }

    return Number((valor * taxa).toFixed(2));
  }
}