import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogServiceComponent } from '../../components/services/dialog-service.component';
import { NotificationServiceComponent } from '../../components/services/notification-service.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    DialogServiceComponent,
    NotificationServiceComponent
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  router = inject(Router);
  authService = inject(AuthService);


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
