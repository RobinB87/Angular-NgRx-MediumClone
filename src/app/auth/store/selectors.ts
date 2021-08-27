import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../shared/types/app-state';
import { AuthState } from '../types/auth-state';

export const authFeatureSelector = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => authState.isLoggedIn
);

export const isCurrentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => authState.currentUser
);
