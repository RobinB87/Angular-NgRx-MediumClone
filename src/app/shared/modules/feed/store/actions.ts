import { createAction, props } from '@ngrx/store';

import { FeedResponse } from './../types/feed-response';

export const getFeed = createAction(
  '[Feed Page] Get Feed',
  props<{ url: string }>()
);

export const getFeedSuccess = createAction(
  '[Feed Api]  Get Feed Success',
  props<{ response: FeedResponse }>()
);

export const getFeedFail = createAction('[Feed Api]  Get Feed Fail');
