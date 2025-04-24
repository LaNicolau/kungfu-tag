import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  /**
   *Música tema ambiente do jogo
   */
  public audio = new Audio('../../../assets/village.mp3');
  /**
   * Boolean para representar o estado do som
   * true para ligado e falso para desligado
   */
  public soundState = signal<boolean>(false);

  /**
   *Sempre quando o estado da múscia for alterado irá chamar a função para listenMusic
   */
  constructor() {
    this.audio.volume = 0.05;
    this.audio.loop = true;
    effect(() => {
      this.listenSound(this.soundState());
    });
  }

  /**
   *Dependendo do stado do som irá pausar ou dar play na música
   */
  listenSound(status: boolean) {
    if (status) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
