import { FeedResponse } from './feed-response';

export interface FeedState {
  isLoading: boolean;
  data: FeedResponse | null;
  error: string | null;
}
