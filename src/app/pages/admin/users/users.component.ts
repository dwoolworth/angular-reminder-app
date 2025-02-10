import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service.';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userService = inject(UserService)
}
