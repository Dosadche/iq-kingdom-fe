import { User } from "src/app/shared/models/user.model";
import * as fromRoot from '../../state/app-state.state';
import * as authActions from '../state/auth.action';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AuthState {
    user: User | null,
    signedIn: boolean,
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState {
    auth: AuthState,
}

export const initialState: AuthState = {
    user: null,
    signedIn: false,
    loading: false,
    loaded: false,
    error: '',
}

export function authReducer(state = initialState, action: authActions.AuthAction): AuthState {
    switch (action.type) {
        case authActions.AuthActionTypes.LOGIN:
        case authActions.AuthActionTypes.AUTHENTICATE:
        case authActions.AuthActionTypes.LOGOUT:
            return {
                ...state,
                loading: true,
            };
        case authActions.AuthActionTypes.AUTHENTICAION_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loaded: true,
                loading: false,
            };
        case authActions.AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                signedIn: true,
                loaded: true,
                loading: false,
            };
        case authActions.AuthActionTypes.LOGOUT_SUCCESS:
            return initialState;
        case authActions.AuthActionTypes.AUTHENTICAION_FAIL:
        case authActions.AuthActionTypes.LOGIN_FAIL:
        case authActions.AuthActionTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loaded: false,
                loading: false,
            };
        default:
            return state;
    }
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthUser = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.user
);

export const getAuthLoading = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.loading
);

export const getAuthLoaded = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.loaded
);

export const getAuthFail = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.error
);

export const getIsSignedIn = createSelector(
    getAuthFeatureState,
    (state: AuthState) => state.signedIn
);

