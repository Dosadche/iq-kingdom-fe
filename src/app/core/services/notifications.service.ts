import { Injectable } from '@angular/core';
import { FightResults } from 'src/app/shared/enums/fight-results.enum';
import { Notification } from 'src/app/shared/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  getNotificationImageSrc(notification: Notification): string {
    switch(notification.title) {
      case FightResults.Draft:
      case FightResults.Defeat:
        return './assets/images/shield.svg'; 
      case FightResults.Victory:
      case FightResults.Pending:
      default:
        return './assets/images/sword.svg';
    }
  }
}
