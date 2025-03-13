import { Component } from '@angular/core';
import { PreviewComponent } from '../components/preview/preview.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [PreviewComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'codeLayout';
}
