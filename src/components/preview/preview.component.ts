import { Component, computed, inject } from '@angular/core';
import { PreviewService } from '../../services/preview.service';
import { SanitizePipe } from "../../pipes/sanitize.pipe";

@Component({
  selector: 'app-preview',
  imports: [SanitizePipe],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  private _preview = inject(PreviewService);

  text = computed(() => this._preview.text());
}
