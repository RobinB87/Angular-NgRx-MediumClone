import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RegisterRequest } from './types/register-request';
import { CurrentUser } from '../shared/types/current-user';
import { AuthResponse } from '../shared/types/auth-response';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = environment.apiUrl + '/users';

    return this.http.post<AuthResponse>(url, data).pipe(
      tap((data) => console.log(data)),
      map((response: AuthResponse) => response.user)
    );
  }
}
