import { Component, computed, effect, inject } from '@angular/core';
import { SignalService } from '../../services/signal/signal.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  private _signal = inject(SignalService);

  /**
   * Siganl contendo as falas do personagem
   */
  speechData = computed(() => {
    return this._signal.dataLevel().panda;
  });
  /**
   * Index responsável pela posição do array
   */
  index: number = 0;

  constructor(){effect(()=>{
    console.log(this.speechData()[0])
  })}

  /**
   * Passa para a próxima posição do array
   */
  nextText() {
    this.index += 1;
  }
  /**
   * Fecha o personagem
   */
  startGame() {
    this._signal.showCharacter.set(false);
  }
}
