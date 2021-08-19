import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BackendErrors } from '../../../shared/types/backend-errors';
import { validationErrorsSelector } from '../../store/selectors';
import { registerAction } from './../../store/actions';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  backendErrors$!: Observable<BackendErrors | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.backendErrors$ = this.store.select(validationErrorsSelector);
  }

  onSubmit(): void {
    console.log('submit', this.form.value);
    this.store.dispatch(registerAction(this.form.value));
  }
}
