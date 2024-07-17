import { Action } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

export enum UsersActionTypes {
    LOAD_USERS = '[Users] Load users',
    LOAD_USERS_SUCCESS = '[Users] Load users success',
    LOAD_USERS__FAIL = '[Users] Load users fail',
};

export class LoadUsers implements Action {
    readonly type = UsersActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_USERS_SUCCESS;
    constructor (public payload: { users: User[] }) {}
}

export class LoadUsersFail implements Action {
    readonly type = UsersActionTypes.LOAD_USERS__FAIL;
    constructor (public payload: string) {}
}

export type UserAction = LoadUsers | LoadUsersSuccess | LoadUsersFail;

