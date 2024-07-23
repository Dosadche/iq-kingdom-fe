import { Action } from '@ngrx/store';
import { Notification } from 'src/app/shared/models/notification.model';

export enum NotificationActionTypes {
    LOAD_NOTIFICATIONS = '[Notifications] Load notifications',
    LOAD_NOTIFICATIONS_SUCCESS = '[Notifications] Load notifications success',
    LOAD_NOTIFICATIONS_FAIL = '[Notifications] Load notifications fail',
};

export class LoadNotifications implements Action {
    readonly type = NotificationActionTypes.LOAD_NOTIFICATIONS;
    constructor(public payload: { userId: string }) {}
}

export class LoadNotificationsSuccess implements Action {
    readonly type = NotificationActionTypes.LOAD_NOTIFICATIONS_SUCCESS;
    constructor (public payload: { notifications: Notification[] }) {}
}

export class LoadNotificationsFail implements Action {
    readonly type = NotificationActionTypes.LOAD_NOTIFICATIONS_FAIL;
    constructor (public payload: string) {}
}

export type NotificationAction = LoadNotifications | LoadNotificationsFail | LoadNotificationsSuccess;

