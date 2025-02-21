import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogServiceComponent } from '../../components/services/dialog-service.component';
import { NotificationServiceComponent } from '../../components/services/notification-service.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    DialogServiceComponent,
    NotificationServiceComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

}
