import { Injectable } from '@angular/core';
import { ToasterMessage } from '../models/toaster-message.model';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _toaster?: ToasterMessage;

  constructor() { }

  get toaster(): ToasterMessage | undefined {
    return this._toaster;
  }

  set toaster(toasterMessage: ToasterMessage) {
    this._toaster = toasterMessage;
    setTimeout(() => this.removeToaster(), 3000);
  }

  removeToaster(): void {
    this._toaster = undefined;
  }
}
