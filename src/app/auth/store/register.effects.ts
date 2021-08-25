import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';
import { registerAction, registerFail, registerSuccess } from './actions';
import { CurrentUser } from '../../shared/types/current-user';
import { Router } from '@angular/router';
import { PersistenceService } from './../../shared/services/persistence.service';

@Injectable()
export class RegisterEffect {
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
            console.log(currentUser);
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
}
