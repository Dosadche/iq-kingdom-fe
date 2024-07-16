import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersRestService } from "src/app/core/services/rest/users-rest.service";
import * as userActions from "./user.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { error } from "console";

@Injectable()
export class UserEffect {
    constructor(
        private actions$: Actions,
        private usersRESTService: UsersRestService) {}
    
    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userActions.UsersActionTypes.LOAD_USERS),
            mergeMap((_action: userActions.LoadUsers) => {
                return this.usersRESTService.getAll().pipe(
                    map((users: User[]) => 
                        new userActions.LoadUsersSuccess({ users })),
                    catchError((err) => {
                        return of(new userActions.LoadUsersFail(err.error.message))})
                )
            })
        )
    });
}