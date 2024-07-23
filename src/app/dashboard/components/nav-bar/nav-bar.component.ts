import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() notifications!: Notification[] | null;

  constructor() { }

  get unreadNotificationsAmount(): number {
    return (this.notifications ?? [])
      .filter((notification: Notification) => !notification.isRead).length;
  }
}
