import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor() { }

  confirm(message: string): boolean {
    return window.confirm(message).valueOf();
  }
}
