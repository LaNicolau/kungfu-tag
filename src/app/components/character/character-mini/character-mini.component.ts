import { Component, computed, effect, inject, signal } from '@angular/core';
import { SignalService } from '../../../services/signal/signal.service';
import { NgClass } from '@angular/common';
import { RequestService } from '../../../services/request/request.service';

@Component({
  selector: 'app-character-mini',
  imports: [NgClass],
  templateUrl: './character-mini.component.html',
  styleUrl: './character-mini.component.scss',
})
export class CharacterMiniComponent {
  private _signal = inject(SignalService);
  private _request = inject(RequestService);

  /**
   * Texto contendo o feedback da resposta do usuário
   */
  speechBubble = computed(() => this._signal.characterFeedback());
  /**
   * Nível do jogo
   */
  idLevel = computed(() => this._signal.dataLevel().order);
  /**
   * Boolean responsável por mostrar o balão de fala do personagem
   */
  showSpeechBubble = signal<boolean>(false);

  /**
   * Se conter um texto irá mostrar o balão de fala
   */
  constructor() {
    effect(() => {
      if (this.speechBubble()) {
        this.showSpeechBubble.set(true);
      }
    });
  }

  /**
   * Fecha o balão de fala
   */
  close() {
    if (this.speechBubble()!.status === 200) {
      this._request.getLevel(this.idLevel() + 1).subscribe((data) => {
        this._signal.dataLevel.set(data);
        this._signal.showCharacter.set(true);
      });
    }
    this.showSpeechBubble.set(false);
    this._signal.characterFeedback.set(null);
  }
}
