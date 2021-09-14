import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFeed } from '../../store/actions';
import { feedSelector, isLoadingSelector } from '../../store/selectors';
import { FeedResponse } from './../../types/feed-response';
import { errorSelector } from './../../store/selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrl!: string;

  feed$!: Observable<FeedResponse | null>;
  error$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  fetchData(): void {
    this.store.dispatch(getFeed({ url: this.apiUrl }));
  }

  initializeValues(): void {
    this.feed$ = this.store.select(feedSelector);
    this.error$ = this.store.select(errorSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }
}
