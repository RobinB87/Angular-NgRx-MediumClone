import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../shared/types/app-state';
import { AuthState } from '../types/auth-state';

export const authFeatureSelector = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (auth: AuthState) => auth.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (auth: AuthState) => auth.validationErrors
);
