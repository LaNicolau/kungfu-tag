import { effect, Injectable, signal } from '@angular/core';
import { levelInterface } from '../../interface/level.interface';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  /**
   *Signal contendo os dados de um nível específico
   */
  dataLevel = signal<levelInterface>({ order: 0, description: '', panda: [''] });
  /**
   *Signal contendo o texto digitado pelo usuário do editor de código
   */
  typingText = signal<string>('');
}
