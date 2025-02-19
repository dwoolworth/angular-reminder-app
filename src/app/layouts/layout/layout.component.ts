import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogServiceComponent } from '../../components/services/dialog-service.component';
import { NotificationServiceComponent } from '../../components/services/notification-service.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    DialogServiceComponent,
    NotificationServiceComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
