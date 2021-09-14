import { createReducer, on } from '@ngrx/store';
import { FeedState } from '../types/feed-state';
import { getFeed, getFeedSuccess, getFeedFail } from './actions';

const initialState: FeedState = {
  isLoading: false,
  data: null,
  error: null,
};

export const feedReducer = createReducer(
  initialState,
  on(getFeed, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getFeedSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.response,
  })),
  on(getFeedFail, (state) => ({
    ...state,
    isLoading: false,
    data: null,
  }))
);
