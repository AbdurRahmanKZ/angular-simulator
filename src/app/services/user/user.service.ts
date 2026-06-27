import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, finalize } from 'rxjs';
import { IUsers } from '../../interfaces/users/users';
import { UserApiService } from '../user-api/user-api.service';
import { MessageService } from '../message/message.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);

  private userSubject = new BehaviorSubject<IUsers[]>([]);
  readonly users$ = this.userSubject.asObservable();

  setUsers(users: IUsers[]) {
    this.userSubject.next(users);
  }

  getUsers(): Observable<IUsers[]> {
    return this.users$;
  }

  loadUsers() {
    this.loaderService.showLoader();

    this.userApiService.getUsers().pipe(
      catchError(() => {
        this.messageService.showError('Не удалось загрузить пользователей');
        return of([] as IUsers[]);
      }),

      finalize(() => {
        console.log('loader hide');
        this.loaderService.hideLoader();
      })
    ).subscribe((users: IUsers[]) => {
      this.setUsers(users)
    })
  }
}
