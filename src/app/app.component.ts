import { SideBarComponent } from './components/side-bar/side-bar.component';
import { Component, effect, inject } from '@angular/core';

import { PreviewComponent } from './components/preview/preview.component';
import { RequestService } from './services/request/request.service';
import { SignalService } from './services/signal/signal.service';

@Component({
  selector: 'app-root',
  imports: [PreviewComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _request = inject(RequestService);
  private _signal = inject(SignalService);

  /**
   * Faz uma requisição get para buscar os dados do nível
   * Seta essas dados no signal de dataLevel
   */
  ngOnInit() {
    this._request.getLevel().subscribe((data) => {
      this._signal.dataLevel.set(data);
    });
  }
}
