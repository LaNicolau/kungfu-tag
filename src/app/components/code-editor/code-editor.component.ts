import { Component, computed, effect, inject } from '@angular/core';
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
    return this._signal.dataLevel().order;
  });
  /**
   * Texto digitado pelo usuário
   */
  public inputText: string = '';
  /**
   * Atualiza o texto digitado pelo usuário
   */
  constructor() {
    effect(() => {
      this.idLevel();
      this.inputText = '';
      this._signal.typingText.set(this.inputText);
    });
  }

  ngAfterViewInit() {
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    textarea!.addEventListener('keydown', function (event) {
      const linhasAtuais = textarea!.value.split('\n').length;

      if (event.key === 'Enter' && linhasAtuais >= 12) {
        event.preventDefault(); // Impede a inserção de uma nova linha
      }
    });
  }

  /**
   * Atualiza o texto digitado pelo usuário
   */
  changeText() {
    this._signal.typingText.set(this.inputText);
  }
  /**
   * Manda o feedback da resposta do usuário para o personagem
   */
  checkAnswer() {
    this._request
      .postAnswer(this.idLevel(), this.inputText)
      .subscribe((resp) => {
        this._signal.characterFeedback.set(resp);
      });
  }
}
