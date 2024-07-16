import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error?: string;

  constructor() { }

  get error(): string | undefined{
    return this._error;
  }

  set error(errorMessage: string) {
    this._error = errorMessage;
    setTimeout(() => this.removeError(), 3000);
  }

  removeError(): void {
    this._error = undefined;
  }
}
