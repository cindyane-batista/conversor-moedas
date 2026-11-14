import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppService {
  // Exemplo de taxas base fixas ou mockadas para os testes
  private taxas: Record<string, Record<string, number>> = {
    USD: { BRL: 5, EUR: 0.91, USD: 1 },
    BRL: { USD: 0.2, EUR: 0.18, BRL: 1 },
    EUR: { USD: 1.1, BRL: 5.5, EUR: 1 },
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