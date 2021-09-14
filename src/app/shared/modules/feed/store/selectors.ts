import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../../types/app-state';
import { FeedState } from '../types/feed-state';

export const feedFeatureSelector = createFeatureSelector<AppState, FeedState>(
  'feed'
);

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedState) => feedState.isLoading
);

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedState) => feedState.error
);

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedState) => feedState.data
);
