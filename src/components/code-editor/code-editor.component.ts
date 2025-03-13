import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
})
export class CodeEditorComponent {
  private _preview = inject(PreviewService);
  editor: string = '';

  checkAnswer() {
    console.log(this.editor);
  }

  changeText() {
    this._preview.setText(this.editor);
  }
}
