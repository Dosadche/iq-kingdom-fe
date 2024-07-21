import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../state/users/user.action';
import * as authActions from '../../../auth/state/auth.action';
import * as fromUser from '../../state/users/user.reducer';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { Observable, tap } from 'rxjs';
import { StorageKeys, StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user!: Observable<User | null>;
  constructor(private store: Store<fromUser.AppState>,
              private router: Router,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.getUser();
    this.subscribeOnStore();
  }

  handleLogout(): void {
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['auth/sign-in']);
  }

  handleRevive(): void {
    this.store.dispatch(new userActions.ReviveUser());
  }

  private getUser(): void {
    const userId = this.storageService.getItem(StorageKeys.User).id;
    if (!userId) return;
    this.store.dispatch(new userActions.LoadUser({ id: userId }));
  }

  private subscribeOnStore(): void {
    this.user = this.store.pipe(select(fromUser.getUser));
  }
}
