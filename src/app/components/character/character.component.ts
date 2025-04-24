import { Component, computed, inject } from '@angular/core';
import { SoundService } from '../../services/sound/sound.service';
import { CharacterService } from '../../services/character/character.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  private _store = inject(StoreService);
  private _sound = inject(SoundService);
  private _character = inject(CharacterService);

  /**
   * Signal contendo as falas do personagem
   */
  speechData = computed(() => {
    return this._store.dataLevel();
  });
  /**
   * Boolean responsável por verificar se já passamos pelo primeiro balão de fala
   */
  hasPassed = true;
  /**
   * Index responsável pela posição do array
   */
  index: number = 0;

  /**
   * Passa para a próxima posição do array
   */
  nextText() {
    this.index += 1;
  }
  /**
   * Fecha o personagem(ARRUMAR)
   */
  startGame() {
    this._character.showCharacter.set(false);
    if (this.speechData().order === 1) {
      this._sound.soundState.set(true);
    }
  }
}
