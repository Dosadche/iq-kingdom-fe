import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../state/users/user.action';
import * as authActions from '../../../auth/state/auth.action';
import * as notificationAction from '../../state/notifications/notification.action';
import * as fromUser from '../../state/users/user.reducer';
import * as fromNotifications from '../../state/notifications/notification.reducer';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import {
  StorageKeys,
  StorageService,
} from 'src/app/core/services/storage.service';
import { Notification } from 'src/app/shared/models/notification.model';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { UserInfoCardComponent } from '../user-info-card/user-info-card.component';
import { FightsInfoComponent } from '../fights-info/fights-info.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    UserInfoCardComponent,
    FightsInfoComponent,
    NavBarComponent,
    RouterModule,
  ],
})
export class LayoutComponent implements OnInit {
  user = toSignal(this.store.pipe(select(fromUser.getUser)));
  notifications = toSignal(
    this.store.pipe(select(fromNotifications.getNotifications))
  );
  private userId!: string;
  constructor(
    private store: Store<fromUser.AppState>,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getNotifications();
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
    this.store.dispatch(
      new notificationAction.LoadNotifications({ userId: this.userId })
    );
  }
}
