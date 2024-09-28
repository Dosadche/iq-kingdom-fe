import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Notification } from 'src/app/shared/models/notification.model';
import { UnreadPipe } from 'src/app/shared/pipes/unread.pipe';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [UnreadPipe, RouterModule],
})
export class NavBarComponent {
  @Input() notifications?: Notification[] | null;

  constructor() {}

  get unreadNotificationsAmount(): number {
    return (this.notifications ?? []).filter(
      (notification: Notification) => !notification.isRead
    ).length;
  }
}
