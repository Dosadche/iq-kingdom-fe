import { Injectable } from '@angular/core';
import { StorageKeys, StorageService } from '../services/storage.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../auth/state/auth.action';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private storageService: StorageService,
              private store: Store,
              private router: Router,
  ) {}

  canActivate(): boolean {
    const user: User = this.storageService.getItem(StorageKeys.User);
    if (user) {
      this.store.dispatch(new authActions.LoginSuccess(user));
      return true;
    }
    this.router.navigate(['auth/sign-in']);
    return false;
  }
}
