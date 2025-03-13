import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  text = signal<string>('');

  setText(text: string) {
    this.text.set(text);
  }
}
