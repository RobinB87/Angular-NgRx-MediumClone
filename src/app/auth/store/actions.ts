import { createAction, props } from '@ngrx/store';

import { BackendErrors } from '../../shared/types/backend-errors';
import { LoginRequest } from '../types/login-request';
import { RegisterRequest } from '../types/register-request';
import { CurrentUser } from './../../shared/types/current-user';

export const registerAction = createAction(
  '[Register Page] Register',
  props<{ request: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Register Api] Register Success',
  props<{ currentUser: CurrentUser }>()
);

export const registerFail = createAction(
  '[Register Api] Register Fail',
  props<{ errors: BackendErrors }>()
);

export const loginAction = createAction(
  '[Login Page] Login',
  props<{ request: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Login Api] Login Success',
  props<{ currentUser: CurrentUser }>()
);

export const loginFail = createAction(
  '[Login Api] Login Fail',
  props<{ errors: BackendErrors }>()
);
