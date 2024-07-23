import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../state/users/user.action';
import * as authActions from '../../../auth/state/auth.action';
import * as notificationAction from '../../state/notifications/notification.action';
import * as fromUser from '../../state/users/user.reducer';
import * as fromNotifications from '../../state/notifications/notification.reducer';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { StorageKeys, StorageService } from 'src/app/core/services/storage.service';
import { Notification } from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user!: Observable<User | null>;
  notifications!: Observable<Notification[]>;
  private userId!: string;
  constructor(private store: Store<fromUser.AppState>,
              private router: Router,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.getUser();
    this.getNotifications()
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
    this.userId = this.storageService.getItem(StorageKeys.User).id;
    if (!this.userId) return;
    this.store.dispatch(new userActions.LoadUser({ id: this.userId }));
  }

  private getNotifications(): void {
    this.store.dispatch(new notificationAction.LoadNotifications({ userId: this.userId }));
  }

  private subscribeOnStore(): void {
    this.user = this.store.pipe(select(fromUser.getUser));
    this.notifications = this.store.pipe(select(fromNotifications.getNotifications));
  }
}
