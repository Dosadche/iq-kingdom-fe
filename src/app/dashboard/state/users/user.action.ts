import { Action } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

export enum UsersActionTypes {
    LOAD_USERS = '[Users] Load users',
    LOAD_USERS_SUCCESS = '[Users] Load users success',
    LOAD_USERS_FAIL = '[Users] Load users fail',
    LOAD_USER = '[Users] Load user',
    LOAD_USER_SUCCESS = '[Users] Load user success',
    LOAD_USER_FAIL = '[Users] Load user fail',
};

export class LoadUsers implements Action {
    readonly type = UsersActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_USERS_SUCCESS;
    constructor (public payload: { users: User[] }) {}
}

export class LoadUsersFail implements Action {
    readonly type = UsersActionTypes.LOAD_USERS_FAIL;
    constructor (public payload: string) {}
}

export class LoadUser implements Action {
    readonly type = UsersActionTypes.LOAD_USER;
    constructor(public payload: { id: string }) {}
}

export class LoadUserSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_USER_SUCCESS;
    constructor (public payload: { user: User }) {}
}

export class LoadUserFail implements Action {
    readonly type = UsersActionTypes.LOAD_USER_FAIL;
    constructor (public payload: string) {}
}

export type UserAction = LoadUsers | LoadUsersSuccess | LoadUsersFail | LoadUser | LoadUserSuccess | LoadUserFail;

