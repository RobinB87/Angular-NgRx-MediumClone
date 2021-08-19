import { BackendErrors } from '../../shared/types/backend-errors';
import { CurrentUser } from '../../shared/types/current-user';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: CurrentUser | null;
  isLoggedIn: boolean | null;
  validationErrors: BackendErrors | null;
}
