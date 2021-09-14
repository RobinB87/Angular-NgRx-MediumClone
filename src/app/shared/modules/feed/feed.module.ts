import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedComponent } from './components/feed/feed.component';
import { FeedEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { feedReducer } from './store/reducers';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('feed', feedReducer),
    EffectsModule.forFeature([FeedEffects]),
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
