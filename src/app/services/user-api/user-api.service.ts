import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient);

  private readonly USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.USERS_API_URL);
  }
}
