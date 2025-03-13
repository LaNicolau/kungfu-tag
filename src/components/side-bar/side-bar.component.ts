import { Component, signal } from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [CodeEditorComponent, NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  showLevels = signal<boolean>(false);

  openLevelList(){
    this.showLevels.set(!this.showLevels())
  }

  changeLevel(index: number){
    console.log('number level',index)
  }
}
