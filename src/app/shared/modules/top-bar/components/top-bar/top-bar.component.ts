import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import {
  isCurrentUserSelector,
  isLoggedInSelector,
} from '../../../../../auth/store/selectors';
import { CurrentUser } from './../../../../types/current-user';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>;
  currentUser$!: Observable<CurrentUser | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
    this.currentUser$ = this.store.select(isCurrentUserSelector);
  }
}
