import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'reminder-app';
}
