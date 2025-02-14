import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'reminder-app';
}
