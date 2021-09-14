import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FeedService } from './../services/feed.service';
import { getFeed, getFeedFail, getFeedSuccess } from './actions';
import { FeedResponse } from './../types/feed-response';

@Injectable()
export class FeedEffects {
  constructor(private actions$: Actions, private feedService: FeedService) {}

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeed),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((response: FeedResponse) => {
            return getFeedSuccess({ response });
          }),

          catchError(() => {
            return of(getFeedFail());
          })
        );
      })
    )
  );
}
