import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { BackendErrorMessagesModule } from './../shared/modules/backend-error-messages/backend-error-messages.modules';
import { RegisterComponent } from './components/register/register.component';
import { authReducer } from './store/reducers';
import { AuthService } from './auth.service';
import { PersistenceService } from './../shared/services/persistence.service';

const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BackendErrorMessagesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
  ],
  declarations: [RegisterComponent],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
