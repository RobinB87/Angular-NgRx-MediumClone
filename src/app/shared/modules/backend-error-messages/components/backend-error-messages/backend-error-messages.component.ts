import { Component, Input, OnInit } from '@angular/core';
import { BackendErrors } from '../../../../types/backend-errors';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrors | null;
  errorMessages!: string[];

  ngOnInit(): void {
    if (this.backendErrorsProps) {
      this.errorMessages = Object.keys(this.backendErrorsProps).map(
        (name: string) => {
          const messages = this.backendErrorsProps![name].join(' ');
          return `${name} ${messages}`;
        }
      );
    }
  }
}
