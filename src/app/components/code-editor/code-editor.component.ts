import { Component, computed, inject } from '@angular/core';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { RequestService } from '../../services/request/request.service';
import { SignalService } from '../../services/signal/signal.service';

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
})
export class CodeEditorComponent {
  private _signal = inject(SignalService);
  private _request = inject(RequestService);

  /**
   * Contém o número do nível
   */
  public idLevel = computed(() => {
    return this._signal.dataLevel().id;
  });
  /**
   * Texto digitado pelo usuário
   */
  public inputText: string = '';

   /**
   * Atualiza o texto digitado pelo usuário
   */

  changeText() {
    this._signal.typingText.set(this.inputText);
  }
   /**
   * Verifica se a resposta do usuário está correta
   */
   checkAnswer() {
    this._request.postAnswer(this.idLevel(), this.inputText).subscribe((resp) => {
      console.log(resp);
    });
  }
}
