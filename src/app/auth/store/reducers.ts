import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth-state';
import {
  loginAction,
  loginFail,
  loginSuccess,
  registerAction,
  registerFail,
  registerSuccess,
} from './actions';

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
      isLoggedIn: false,
    })
  ),
  on(
    registerSuccess,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFail,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      validationErrors: action.errors,
      currentUser: null,
    })
  ),
  on(
    loginAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: true,
      isLoggedIn: false,
    })
  ),
  on(
    loginSuccess,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoggedIn: true,
    })
  ),
  on(
    loginFail,
    (state, action): AuthState => ({
      ...state,
      isSubmitting: false,
      currentUser: null,
      isLoggedIn: false,
      validationErrors: action.errors,
    })
  )
);
