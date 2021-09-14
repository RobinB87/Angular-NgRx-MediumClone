import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth-state';
import {
  getCurrentUser,
  getCurrentUserFail,
  getCurrentUserSuccess,
  login,
  loginFail,
  loginSuccess,
  register,
  registerFail,
  registerSuccess,
} from './actions';

const initialState: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    register,
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
    login,
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
  ),
  on(
    getCurrentUser,
    (state): AuthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccess,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFail,
    (state): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  )
);
