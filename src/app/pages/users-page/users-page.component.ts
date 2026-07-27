import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUsers } from '../../interfaces/users/users';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserCardComponent } from './user-card/user-card.component';
@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  public userService: UserService = inject(UserService);

  public users$: Observable<IUsers[]> = this.userService.getUsers();

  private ngOnInit(): void {
    this.userService.loadUsers();
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId)
  }
}
