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
   * Texto contendo o feedback da resposta do usuário
   */
  closeSpeechBubble = computed(() => this._character.closeSpeechBubble());
  /**
   * Nível do jogo
   */
  data = computed(() => this._store.dataLevel());
  /**
   *Signal contendo um boolean informando se o jogo terminou
   */
  endGame = signal<boolean>(false);
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
   * Número total de níveis existentes.
   */
  totalNumberLevels!: number;
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
        this.closeHelp();
      }
      if(this.closeSpeechBubble()){
       this.close();
      }
    });
  }
  /**
   * Aguarda 2 minutos e mostra a sugestão de ajuda automaticamente.
   */
  ngOnInit() {
    this._request.getNumberLevels().subscribe((number) => {
      this.totalNumberLevels = number.length;
    });

    setTimeout(() => {
      if (!this.showSpeechBubble()) {
        this.showHelpBubble.set(true);
      }
    }, 90000);
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
  closeFeedback() {
    const feedback = this.speechBubble();
    if (feedback?.status === 200) {
      if (this.data().order === this.totalNumberLevels) {
        this.endGame.set(true);
      } else {
        this._request.getLevel(this.data().order + 1).subscribe((newLevel) => {
          this._store.dataLevel.set(newLevel);
          this._character.showCharacter.set(true);
        });
      }
    }
    this.showSpeechBubble.set(false);
    this._character.characterFeedback.set(null);
  }
  /**
   * Fecha o balão final do jogo
   */
  closeEndGame() {
    this.endGame.set(false);
  }
 /**
   * Fecha todos os balões
   */
  close(){
    this.showSpeechBubble.set(false);
    this._character.characterFeedback.set(null);
    this.showHelpBubble.set(false);
    this.passTip.set(false);
    this.endGame.set(false);
    this._character.closeSpeechBubble.set(false)
  }
}
