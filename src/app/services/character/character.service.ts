import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  /**
   *Signal contendo boolean responsável por fazer o personagem principal aparecer
   */
  showCharacter = signal<boolean>(true);
  /**
   *Signal contendo boolean responsável por fechar qualquer balão de fala do eprsonagem ao trocar de nível
   */
  closeSpeechBubble = signal<boolean>(false);
  /**
   *Signal contendo o feedback da resposta do usuário
   */
  characterFeedback = signal<{ message: string; status: number } | null>(null);
}
