import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrors } from '../../../shared/types/backend-errors';
import { login } from '../../store/actions';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { LoginRequest } from '../../types/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrors | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.isSubmitting$ = this.store.select(isSubmittingSelector);
    this.backendErrors$ = this.store.select(validationErrorsSelector);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const request: LoginRequest = {
      user: this.form.value,
    };

    this.store.dispatch(login({ request }));
  }
}
