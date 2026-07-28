import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUsers } from '../../interfaces/users/users';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserCardComponent } from './user-card/user-card.component';
import { UserCreateComponent } from './user-create/user-create.component';
@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  public userService: UserService = inject(UserService);

  public users$: Observable<IUsers[]> = this.userService.getUsers();

  public ngOnInit(): void {
    this.userService.loadUsers();
  }

  public onUserCreated(user: IUsers): void {
    this.userService.addUser(user);
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId)
  }
}
