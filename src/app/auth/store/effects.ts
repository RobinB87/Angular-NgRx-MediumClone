import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import {
  getCurrentUserAction,
  getCurrentUserFail,
  getCurrentUserSuccess,
  loginAction,
  loginFail,
  loginSuccess,
  registerAction,
  registerFail,
  registerSuccess,
} from './actions';
import { CurrentUser } from '../../shared/types/current-user';
import { Router } from '@angular/router';
import { PersistenceService } from '../../shared/services/persistence.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUser) => {
            this.persistenceService.set('accessToken', currentUser.token);
            return registerSuccess({ currentUser });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFail({ errors: errorResponse.error.errors }));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUser) => {
            this.persistenceService.set('accessToken', currentUser.token);
            return loginSuccess({ currentUser });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFail({ errors: errorResponse.error.errors }));
          })
        );
      })
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceService.get('accessToken');
        if (!token) return of(getCurrentUserFail());

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUser) => {
            return getCurrentUserSuccess({ currentUser });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCurrentUserFail());
          })
        );
      })
    )
  );
}
