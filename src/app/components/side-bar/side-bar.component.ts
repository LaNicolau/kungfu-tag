import { levelInterface } from './../../interface/level.interface';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { NgClass } from '@angular/common';
import { RequestService } from '../../services/request/request.service';
import { SignalService } from '../../services/signal/signal.service';

@Component({
  selector: 'app-side-bar',
  imports: [CodeEditorComponent, NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  private _request = inject(RequestService);
  private _signal = inject(SignalService);

  data = computed(() => {
    return this._signal.dataLevel();
  });
  numberLevels: any;

  ngOnInit() {
    this._request.getNumberLevels().subscribe((number) => {
      this.numberLevels = number;
    });
  }

  /**
   * Signal contendo um booleano que ficará responsável por mostrar os níveis para o usuário
   */
  showLevels = signal<boolean>(false);

  /**
   * Irá trazer os dados do nível selecionado pelo usuário
   */
  changeLevel(index: number) {
    this._request.getLevel(index).subscribe((data) => {
      this._signal.dataLevel.set(data);
    });
  }
}
