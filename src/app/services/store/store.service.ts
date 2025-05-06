import { Injectable, signal } from '@angular/core';
import { levelInterface } from '../../interface/level.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  /**
   *Signal contendo os dados de um nível
   */
   dataLevel = signal<levelInterface>({
    order: 0,
    description: '',
    tip: '',
    panda: [''],
  });
  /**
   *Signal contendo o texto digitado pelo usuário do editor de código
   */
  typingText = signal<string>('');
  /**
   *Signal contendo um boolean informando se o jogo terminou
   */
  endGame = signal<boolean>(false);
}
