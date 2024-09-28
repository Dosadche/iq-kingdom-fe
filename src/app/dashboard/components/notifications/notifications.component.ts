import { Component, OnInit } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Notification } from 'src/app/shared/models/notification.model';
import * as fromNotifications from '../../state/notifications/notification.reducer';
import * as notificationActions from '../../state/notifications/notification.action';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { FightResults } from 'src/app/shared/enums/fight-results.enum';
import { NotificationsRestService } from 'src/app/core/services/rest/notifications-rest.service';
import {
  StorageKeys,
  StorageService,
} from 'src/app/core/services/storage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [SharedModule, NgClass],
})
export class NotificationsComponent {
  isLoading = toSignal(
    this.store.pipe(select(fromNotifications.getNotificationsLoading))
  );
  notifications = toSignal(
    this.store.pipe(
      select(fromNotifications.getNotifications),
      tap((notifications: Notification[]) =>
        this.readNotifications(notifications)
      )
    )
  );
  protected readonly FightResults = FightResults;

  constructor(
    private store: Store<fromNotifications.AppState>,
    private notificationsService: NotificationsService,
    private notificationsRESTService: NotificationsRestService,
    private storageService: StorageService
  ) {}

  getNotificationImage(notification: Notification): string {
    return this.notificationsService.getNotificationImageSrc(notification);
  }

  private readNotifications(notifications: Notification[]): void {
    const ids = notifications
      .filter((notification: Notification) => !notification.isRead)
      .map((notification: Notification) => notification.id);
    if (ids?.length) {
      setTimeout(() => {
        this.notificationsRESTService
          .read(ids)
          .pipe(take(1))
          .subscribe(() => {
            const userId = this.storageService.getItem(StorageKeys.User).id;
            this.store.dispatch(
              new notificationActions.LoadNotifications({ userId })
            );
          });
      }, 3000);
    }
  }
}
