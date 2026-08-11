import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, EMPTY, finalize } from 'rxjs';
import { IUsers } from '../../interfaces/users/users';
import { UserApiService } from '../user-api/user-api.service';
import { MessageService } from '../message/message.service';
import { LoaderService } from '../loader/loader.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USERS_STORAGE_KEY = 'users';

  private readonly userApiService: UserApiService = inject(UserApiService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  private userSubject = new BehaviorSubject<IUsers[]>([]);
  readonly users$ = this.userSubject.asObservable();

  private setUsers(users: IUsers[]) {
    this.userSubject.next(users);

    this.localStorageService.set<IUsers[]>(
      this.USERS_STORAGE_KEY,
      users
    );
  }

  getUsers(): Observable<IUsers[]> {
    return this.users$;
  }

  loadUsers(): void {
    const storedUsers =
      this.localStorageService.get<IUsers[]>(
        this.USERS_STORAGE_KEY
      );
    if (storedUsers !== null && storedUsers.length > 0) {
      this.userSubject.next(storedUsers);
      return;
    }

    this.loaderService.showLoader();

    this.userApiService.getUsers().pipe(
      catchError(() => {
        this.messageService.showError('Не удалось загрузить пользователей');
        return EMPTY;
      }),

      finalize(() => {
        this.loaderService.hideLoader();
      })
    ).subscribe((users: IUsers[]) => {
      this.setUsers(users)
    })
  }

  addUser(user: IUsers): void {
    const users = this.userSubject.getValue();

    const updatedUsers: IUsers[] = [
      user,
      ...users,
    ];

    this.setUsers(updatedUsers);
  }

  deleteUser(userId: number): void {
    const users = this.userSubject.getValue();

    const updatedUsers = users.filter(
      (user: IUsers) => user.id !== userId
    );

    this.setUsers(updatedUsers);
  }
}