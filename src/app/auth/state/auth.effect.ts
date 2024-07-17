import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from './auth.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthRestService } from "src/app/core/services/rest/auth.service";
import { User } from "src/app/shared/models/user.model";
import { StorageKeys, StorageService } from "src/app/core/services/storage.service";

@Injectable()
export class AuthEffect {
    constructor(
        private actions$: Actions,
        private authRESTService: AuthRestService,
        private storageService: StorageService,) {}
    
    authenticate$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.AuthActionTypes.AUTHENTICATE),
            mergeMap((action: authActions.Authenticate) => {
                return this.authRESTService.register(action.payload).pipe(
                    map((user: User) => 
                        new authActions.AuthenticationSuccess(user)),
                    catchError((err) => {
                        return of(new authActions.AuthenticationFail(err.error.message))})
                )
            })
        )
    });

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.AuthActionTypes.LOGIN),
            mergeMap((action: authActions.Login) => {
                return this.authRESTService.login(action.payload).pipe(
                    map((user: User) => {
                        this.storageService.setItem(StorageKeys.User, user);
                        return new authActions.LoginSuccess(user);
                    }),
                    catchError((err) => {
                        return of(new authActions.LoginFail(err.error.message))})
                )
            })
        )
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.AuthActionTypes.LOGOUT),
            mergeMap((action: authActions.Logout) => {
                return this.authRESTService.logout().pipe(
                    map(() => {
                        this.storageService.removeItem(StorageKeys.User);
                        return new authActions.LogoutSuccess()
                    }),
                    catchError((err) => {
                        return of(new authActions.LoginFail(err.error.message))})
                )
            })
        )
    });
}