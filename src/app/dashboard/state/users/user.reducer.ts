import * as usersActions from './user.action';
import { User } from '../../../shared/models/user.model';
import * as fromRoot from '../../../state/app-state.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UsersState {
    users: User[],
    currentUser: User | null,
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState {
    users: UsersState,
}

export const initialState: UsersState = {
    users: [],
    currentUser: null,
    loading: false,
    loaded: false,
    error: '',
}

export function usersReducer(state = initialState, action: usersActions.UserAction): UsersState {
    switch (action.type) {
        case usersActions.UsersActionTypes.LOAD_USER:
        case usersActions.UsersActionTypes.LOAD_USERS:
            return {
                ...state,
                loading: true,
            };
        case usersActions.UsersActionTypes.LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                loaded: true,
                loading: false,
            };
        case usersActions.UsersActionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                loaded: true,
                loading: false,
            };
        case usersActions.UsersActionTypes.LOAD_USER_FAIL:
        case usersActions.UsersActionTypes.LOAD_USERS_FAIL:
            return {
                ...state,
                users: [],
                loaded: false,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(
    getUsersFeatureState,
    (state: UsersState) => state.users
);

export const getUser = createSelector(
    getUsersFeatureState,
    (state: UsersState) => state.currentUser
);

export const getUsersLoading = createSelector(
    getUsersFeatureState,
    (state: UsersState) => state.loading
);

export const getUsersLoaded = createSelector(
    getUsersFeatureState,
    (state: UsersState) => state.loaded
);

export const getUsersFail = createSelector(
    getUsersFeatureState,
    (state: UsersState) => state.error
);

