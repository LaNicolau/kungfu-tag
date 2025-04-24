import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { RequestService } from '../../services/request/request.service';
import { SoundService } from '../../services/sound/sound.service';
import { CharacterService } from '../../services/character/character.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
})
export class CodeEditorComponent {
  private _store = inject(StoreService);
  private _request = inject(RequestService);
  private _sound = inject(SoundService);
  private _character = inject(CharacterService);

  /**
   * Contém o número do nível
   */
  public idLevel = computed(() => {
    return this._store.dataLevel().order;
  });
  /**
   * Texto digitado pelo usuário
   */
  public inputText!: string;
  /**
   * Áudio para acerto
   */
  public hitAudio: string | undefined = undefined;
  /**
   * Áudio para erro
   */
  public errorAudio: string | undefined = undefined;

  constructor() {
    effect(() => {
      this.idLevel();
      this.inputText = '';
      this._store.typingText.set(this.inputText);
    });
    effect(() => {
      if (this._sound.soundState()) {
        this.hitAudio = '../../../../assets/correto.mp3';
        this.errorAudio = '../../../../assets/incorreto.mp3';
      } else {
        this.hitAudio = undefined;
        this.errorAudio = undefined;
      }
    });
  }

  /**
   * Faz com que o input de text tenha no máximo 12 linhas
   */
  ngAfterViewInit() {
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    textarea!.addEventListener('keydown', function (event) {
      const linhasAtuais = textarea!.value.split('\n').length;

      if (event.key === 'Enter' && linhasAtuais >= 12) {
        event.preventDefault();
      }
    });
  }

  /**
   * Atualiza o texto digitado pelo usuário
   */
  changeText() {
    this._store.typingText.set(this.inputText);
  }
  /**
   * Manda o feedback da resposta do usuário para o personagem
   */
  checkAnswer() {
    this._request
      .postAnswer(this.idLevel(), this.inputText)
      .subscribe((resp) => {
        this._character.characterFeedback.set(resp);
        if (resp.status === 200) {
          const audio = new Audio(this.hitAudio);
          audio.volume = 0.3;
          audio.play();
        } else {
          const audio = new Audio(this.errorAudio);
          audio.volume = 0.3;
          audio.play();
        }
      });
  }
}
