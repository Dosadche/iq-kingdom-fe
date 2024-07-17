import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersRestService } from "src/app/core/services/rest/users-rest.service";
import * as userActions from "./user.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { User } from "src/app/shared/models/user.model";
import { error } from "console";
import { StorageKeys, StorageService } from "src/app/core/services/storage.service";

@Injectable()
export class UserEffect {
    constructor(
        private actions$: Actions,
        private usersRESTService: UsersRestService,
        private storageService: StorageService) {}
    
    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userActions.UsersActionTypes.LOAD_USERS),
            mergeMap((_action: userActions.LoadUsers) => {
                return this.usersRESTService.getAll().pipe(
                    map((users: User[]) => {
                        const userId: string | undefined = (this.storageService.getItem(StorageKeys.User) as User).id;
                        const filteredUsers: User[] = users
                            .filter((user) => user.id !== userId);
                        return new userActions.LoadUsersSuccess({ users: filteredUsers });
                    }),
                    catchError((err) => {
                        return of(new userActions.LoadUsersFail(err.error.message))})
                )
            })
        )
    });
}