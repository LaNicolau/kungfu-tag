import { Component, computed, inject } from '@angular/core';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { CharacterMiniComponent } from '../character/character-mini/character-mini.component';
import { CharacterService } from '../../services/character/character.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-preview',
  imports: [SanitizePipe, CharacterMiniComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  private _store = inject(StoreService);
  private _character = inject(CharacterService);

  /**
   * Boolean resposável por mostrar o personagem
   */
  showCharacter = computed(() => this._character.showCharacter());
  /**
   * Texto digitado pelo usuário
   */
  text = computed(() => this._store.typingText());
}
