import { Component, computed, inject } from '@angular/core';
import { SignalService } from '../../services/signal/signal.service';
import { SanitizePipe } from '../../pipes/sanitize.pipe';

@Component({
  selector: 'app-preview',
  imports: [SanitizePipe],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  private _signal = inject(SignalService);

  /**
   * Testo digitado pelo usuário
   */
  text = computed(() => this._signal.typingText());
}
