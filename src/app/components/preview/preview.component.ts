import { Component, computed, inject } from '@angular/core';
import { SignalService } from '../../services/signal/signal.service';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { CharacterMiniComponent } from '../character/character-mini/character-mini.component';

@Component({
  selector: 'app-preview',
  imports: [SanitizePipe, CharacterMiniComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  private _signal = inject(SignalService);

  /**
   * Boolean resposável por mostrar o personagem
   */
  showCharacter = computed(() => this._signal.showCharacter());
  /**
   * Texto digitado pelo usuário
   */
  text = computed(() => this._signal.typingText());
}
