import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth-state';
import { registerAction } from './actions';

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: true,
    })
  )
);
