import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { NgClass } from '@angular/common';
import { RequestService } from '../../services/request/request.service';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { SoundService } from '../../services/sound/sound.service';
import { CharacterService } from '../../services/character/character.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-side-bar',
  imports: [CodeEditorComponent, NgClass, SanitizePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  private _request = inject(RequestService);
  private _store = inject(StoreService);
  private _sound = inject(SoundService);
  private _character = inject(CharacterService);

  /**
   * Signal contendo os dados do nível
   */
  data = computed(() => {
    return this._store.dataLevel();
  });
  /**
   * Signal contendo um booleano que ficará responsável por mostrar os níveis para o usuário
   */
  showLevels = signal<boolean>(false);
  /**
   * Signal responsável pelo estado do som
   */
  soundState = computed(() => this._sound.soundState());
  /**
   * Quantidade de níveis existentes
   */
  numberLevels: any = 0;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const eventName = (event.target as HTMLElement).className;

    if (
      eventName !== 'side-bar__level__button' &&
      eventName !== 'img--rotate' &&
      eventName !== 'icon-arrow' &&
      eventName !== 'button__level'
    ) {
      this.showLevels.set(false);
    }
  }

  ngOnInit() {
    this._request.getNumberLevels().subscribe((number) => {
      this.numberLevels = number;
    });
  }

  /**
   * Ao clicar no ícone do som, muda o estado dele
   */
  listenSound() {
    this._sound.soundState.set(!this._sound.soundState());
  }
  /**
   * Ao mudar de nivel busca os dados do nivel desejado
   */
  changeLevel(index: number) {
    this._request.getLevel(index).subscribe((data) => {
      this._store.dataLevel.set(data);
      this.showLevels.set(false);
      this._character.showCharacter.set(true);
      this._character.closeSpeechBubble.set(true);
    });
  }
}
