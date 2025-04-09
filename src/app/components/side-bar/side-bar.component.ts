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
import { SignalService } from '../../services/signal/signal.service';
import { SanitizePipe } from '../../pipes/sanitize.pipe';

@Component({
  selector: 'app-side-bar',
  imports: [CodeEditorComponent, NgClass, SanitizePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  private _request = inject(RequestService);
  private _signal = inject(SignalService);

  /**
   * Signal contendo os dados do nível
   */
  data = computed(() => {
    return this._signal.dataLevel();
  });
  /**
   * Signal contendo um booleano que ficará responsável por mostrar os níveis para o usuário
   */
  showLevels = signal<boolean>(false);
  /**
   * Quantidade de níveis existentes
   */
  numberLevels: any;

  @ViewChild('description') textoRef!: ElementRef;
  @ViewChild('mold') mold!: ElementRef;

  ngOnInit() {
    this._request.getNumberLevels().subscribe((number) => {
      this.numberLevels = number;
    });
  }


  // atualizarMaxHeight() {
  //   const textoEl = this.textoRef.nativeElement as HTMLElement;
  //   const mold = this.mold.nativeElement as HTMLElement;
  //   const alturaCalculada = window.innerHeight - 250;



  //   mold.style.maxHeight = `${alturaCalculada - 65}px`;
  // }

  /**
   * Irá trazer os dados do nível selecionado pelo usuário
   */
  changeLevel(index: number) {
    this._request.getLevel(index).subscribe((data) => {
      this._signal.dataLevel.set(data);
      this.showLevels.set(false);
      this._signal.showCharacter.set(true);
    });
  }
}


