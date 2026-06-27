import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../../interfaces/users/users';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient);

  private readonly USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.USERS_API_URL);
  }
}
