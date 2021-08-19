import { createAction, props } from '@ngrx/store';
import { RegisterRequest } from '../types/register-request';

export const registerAction = createAction(
  '[Register Page] Register',
  props<{ request: RegisterRequest }>()
);
