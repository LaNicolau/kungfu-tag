import { SideBarComponent } from './components/side-bar/side-bar.component';
import { Component, computed, effect, inject, signal } from '@angular/core';

import { PreviewComponent } from './components/preview/preview.component';
import { RequestService } from './services/request/request.service';
import { SignalService } from './services/signal/signal.service';
import { CharacterComponent } from './components/character/character.component';
import { NgClass } from '@angular/common';
import { CharacterMiniComponent } from './components/character/character-mini/character-mini.component';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [
    PreviewComponent,
    SideBarComponent,
    CharacterComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _request = inject(RequestService);
  private _signal = inject(SignalService);

  /**
   * Boolean responsável por fazer o personagem principal aparecer
   */
  showMainCharacter = computed(() => this._signal.showCharacter());
  /**
   * Faz uma requisição get para buscar os dados do nível
   * Seta essas dados no signal de dataLevel
   */

  teste = signal<boolean>(true);

  ngOnInit() {
    this._request.getLevel().subscribe((data) => {
      this._signal.dataLevel.set(data);
      setTimeout(() => {
        this.teste.set(false);
      }, 600);
    });
  }
}
