import { Component, OnInit } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Notification } from 'src/app/shared/models/notification.model';
import * as fromNotifications from '../../state/notifications/notification.reducer';
import * as notificationActions from '../../state/notifications/notification.action';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { FightResults } from 'src/app/shared/enums/fight-results.enum';
import { NotificationsRestService } from 'src/app/core/services/rest/notifications-rest.service';
import { StorageKeys, StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  isLoading!: Observable<boolean>;
  notifications!: Observable<Notification[]>;
  protected readonly FightResults = FightResults;

  constructor(private store: Store<fromNotifications.AppState>,
              private notificationsService: NotificationsService,
              private notificationsRESTService: NotificationsRestService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.subscribeOnStore();
  }

  getNotificationImage(notification: Notification): string {
    return this.notificationsService.getNotificationImageSrc(notification);
  }

  private subscribeOnStore(): void {
    this.notifications = this.store.pipe(
      select(fromNotifications.getNotifications),
      tap((notifications: Notification[]) => this.readNotifications(notifications)));
    this.isLoading = this.store.pipe(select(fromNotifications.getNotificationsLoading));
  }

  private readNotifications(notifications: Notification[]): void {
    const ids = notifications
      .filter((notification: Notification) => !notification.isRead)
      .map((notification: Notification) => notification.id);
    if (ids?.length) {
      setTimeout(() => {
        this.notificationsRESTService.read(ids)
          .pipe(take(1))
          .subscribe(() => {
            const userId = this.storageService.getItem(StorageKeys.User).id;
            this.store.dispatch(new notificationActions.LoadNotifications({ userId }));
          });
      }, 3000);
    }
  }
}
