import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RegisterRequest } from './types/register-request';
import { CurrentUser } from '../shared/types/current-user';
import { AuthResponse } from '../shared/types/auth-response';
import { environment } from '../../environments/environment';
import { LoginRequest } from './types/login-request';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponse): CurrentUser {
    return response.user;
  }

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = environment.apiUrl + '/users';

    return this.http.post<AuthResponse>(url, data).pipe(
      tap((data) => console.log(data)),
      map(this.getUser)
    );
  }

  login(data: LoginRequest): Observable<CurrentUser> {
    const url = environment.apiUrl + '/users/login';

    return this.http.post<AuthResponse>(url, data).pipe(
      tap((data) => console.log(data)),
      map(this.getUser)
    );
  }
}
