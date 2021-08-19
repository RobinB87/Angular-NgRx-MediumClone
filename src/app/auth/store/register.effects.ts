import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';
import { registerAction, registerFail, registerSuccess } from './actions';
import { CurrentUser } from '../../shared/types/current-user';

@Injectable()
export class RegisterEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map((currentUser: CurrentUser) => registerSuccess({ currentUser })),
          catchError((errorResponse: HttpErrorResponse) =>
            of(registerFail({ errors: errorResponse.error.errors }))
          )
        )
      )
    );
  });
}
