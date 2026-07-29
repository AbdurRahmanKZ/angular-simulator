import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUsers } from '../../interfaces/users/users';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { UserCardComponent } from './user-card/user-card.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UsersFilterComponent } from './users-filter/users-filter.component';
@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  public userService: UserService = inject(UserService);
  private readonly filterSubject = new BehaviorSubject<string>('');

  public readonly users$: Observable<IUsers[]> = this.userService.getUsers();

  public readonly filteredUsers$: Observable<IUsers[]> =
    combineLatest([
      this.users$,
      this.filterSubject,
    ]).pipe(
      map(([users, filterValue]: [IUsers[], string]) => {
        if (!filterValue) {
          return users;
        }

        return users.filter((user: IUsers) =>
          user.name
            .trim()
            .toLowerCase()
            .includes(filterValue)
        );
      })
    );

  public onFilterChanged(value: string): void {
    this.filterSubject.next(value);
  }

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
