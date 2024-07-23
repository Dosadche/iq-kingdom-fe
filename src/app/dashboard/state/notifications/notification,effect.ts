import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as notificationsActions from "./notification.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { NotificationsRestService } from "src/app/core/services/rest/notifications-rest.service";
import { Notification } from "src/app/shared/models/notification.model";

@Injectable()
export class NotificationEffect {
    constructor(
        private actions$: Actions,
        private notificationsRESTService: NotificationsRestService) {}
    
    loadNotifications$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(notificationsActions.NotificationActionTypes.LOAD_NOTIFICATIONS),
            mergeMap((action: notificationsActions.LoadNotifications) => {
                return this.notificationsRESTService.getByUserId(action.payload.userId).pipe(
                    map((notifications: Notification[]) => 
                        new notificationsActions.LoadNotificationsSuccess({ notifications })),
                    catchError((err) => {
                        return of(new notificationsActions.LoadNotificationsFail(err.error.message))})
                )
            })
        )
    });
}