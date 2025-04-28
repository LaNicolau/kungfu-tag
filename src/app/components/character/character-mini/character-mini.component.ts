import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RequestService } from '../../../services/request/request.service';
import { CharacterService } from '../../../services/character/character.service';
import { StoreService } from '../../../services/store/store.service';

@Component({
  selector: 'app-character-mini',
  imports: [NgClass],
  templateUrl: './character-mini.component.html',
  styleUrl: './character-mini.component.scss',
})
export class CharacterMiniComponent {
  private _store = inject(StoreService);
  private _request = inject(RequestService);
  private _character = inject(CharacterService);

  /**
   * Texto contendo o feedback da resposta do usuário
   */
  speechBubble = computed(() => this._character.characterFeedback());
  /**
   * Nível do jogo
   */
  data = computed(() => this._store.dataLevel());
  /**
   * Controla a exibição do balão de fala com o feedback da resposta.
   */
  showSpeechBubble = signal<boolean>(false);
  /**
   * Controla a exibição da pergunta de ajuda.
   */
  showHelpBubble = signal<boolean>(false);
  /**
   * Controla se a dica está sendo exibida.
   */
  passTip = signal<boolean>(false);
  /**
   * Referência ao elemento HTML do personagem principal (panda).
   */
  @ViewChild('panda') pandaRef!: ElementRef;

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
   * Aguarda 2 minutos e mostra a sugestão de ajuda automaticamente.
   */
  ngOnInit() {
    setTimeout(() => {
      if (!this.showSpeechBubble()) {
        this.showHelpBubble.set(true);
      }
    }, 120000);
  }
  /**
   * Executado após o componente ser renderizado.
   * Adiciona um ouvinte de clique no panda para oferecer ajuda, caso a dica não esteja visível.
   */
  ngAfterViewInit() {
    this.pandaRef.nativeElement.addEventListener('click', () => {
      if (!this.passTip()) {
        this.showHelpBubble.set(true);
      }
    });
  }
  /**
   * Fecha os balões de ajuda
   */
  closeHelp() {
    this.showHelpBubble.set(false);
    this.passTip.set(false);
  }
  /**
   * Confirma a ajuda e exibe a dica
   */
  confirmHelp() {
    this.passTip.set(true);
    this.showHelpBubble.set(false);
  }
  /**
   * Fecha o balão de fala e avança de nível, se aplicável
   */
  close() {
    const feedback = this.speechBubble();
    if (feedback?.status === 200) {
      this._request.getLevel(this.data().order + 1).subscribe((newLevel) => {
        this._store.dataLevel.set(newLevel);
        this._character.showCharacter.set(true);
      });
    }
    this.showSpeechBubble.set(false);
    this._character.characterFeedback.set(null);
  }
}
