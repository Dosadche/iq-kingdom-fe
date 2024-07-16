import { Action } from "@ngrx/store";
import { LoginCredentials, RegisterCredentials } from "src/app/core/models/auth-credentials.model";
import { User } from "src/app/core/models/user.model";

export enum AuthActionTypes {
    AUTHENTICATE = '[Auth] Authenticate',
    AUTHENTICAION_SUCCESS = '[Auth] Authention success',
    AUTHENTICAION_FAIL = '[Auth] Authention fail',
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login success',
    LOGIN_FAIL = '[Auth] Login fail',
    LOGOUT = '[Auth] Logout',
    LOGOUT_SUCCESS = '[Auth] Logout success',
    LOGOUT_FAIL = '[Auth] Logout fail',
}

export class Authenticate implements Action {
    readonly type = AuthActionTypes.AUTHENTICATE;
    constructor(public payload: RegisterCredentials) {}
}

export class AuthenticationSuccess {
    readonly type = AuthActionTypes.AUTHENTICAION_SUCCESS;
    constructor(public payload: User) {}
}

export class AuthenticationFail {
    readonly type = AuthActionTypes.AUTHENTICAION_FAIL;
    constructor(public payload: string) {}
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: LoginCredentials) {}
}

export class LoginSuccess {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: User) {}
}

export class LoginFail {
    readonly type = AuthActionTypes.LOGIN_FAIL;
    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor() {}
}

export class LogoutSuccess {
    readonly type = AuthActionTypes.LOGOUT_SUCCESS;
    constructor() {}
}

export class LogoutFail {
    readonly type = AuthActionTypes.LOGOUT_FAIL;
    constructor(public payload: string) {}
}

export type AuthAction = 
    Authenticate | 
    AuthenticationSuccess | 
    AuthenticationFail |
    Login |
    LoginSuccess |
    LoginFail |
    Logout |
    LogoutSuccess |
    LogoutFail;