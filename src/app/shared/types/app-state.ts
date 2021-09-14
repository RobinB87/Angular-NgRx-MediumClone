import { AuthState } from '../../auth/types/auth-state';
import { FeedState } from '../modules/feed/types/feed-state';

export interface AppState {
  auth?: AuthState;
  feed?: FeedState;
}
