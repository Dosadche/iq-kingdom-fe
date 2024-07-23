import * as notificationActions from './notification.action';
import * as fromRoot from '../../../state/app-state.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Notification } from 'src/app/shared/models/notification.model';

export interface NotificationsState {
    notifications: Notification[],
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState {
    notifications: NotificationsState,
}

export const initialState: NotificationsState = {
    notifications: [],
    loading: false,
    loaded: false,
    error: '',
}

export function notificationReducer(state = initialState, action: notificationActions.NotificationAction): NotificationsState {
    switch (action.type) {
        case notificationActions.NotificationActionTypes.LOAD_NOTIFICATIONS:
            return {
                ...state,
                loading: true,
            };
        case notificationActions.NotificationActionTypes.LOAD_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.payload.notifications,
                loaded: true,
                loading: false,
            };
        case notificationActions.NotificationActionTypes.LOAD_NOTIFICATIONS_FAIL:
            return {
                ...state,
                notifications: [],
                loaded: false,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

const getNotificationsFeatureState = createFeatureSelector<NotificationsState>('notifications');

export const getNotifications = createSelector(
    getNotificationsFeatureState,
    (state: NotificationsState) => state.notifications
);

export const getNotificationsLoading = createSelector(
    getNotificationsFeatureState,
    (state: NotificationsState) => state.loading
);

export const getNotificationsLoaded = createSelector(
    getNotificationsFeatureState,
    (state: NotificationsState) => state.loaded
);

export const getNotificationsFail = createSelector(
    getNotificationsFeatureState,
    (state: NotificationsState) => state.error
);

