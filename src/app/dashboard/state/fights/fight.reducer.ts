import * as fightActions from './fight.action';
import * as fromRoot from '../../../state/app-state.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Fight } from 'src/app/shared/models/fight.model';

export interface FightsState {
    fights: Fight[],
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState {
    fights: FightsState,
}

export const initialState: FightsState = {
    fights: [],
    loading: false,
    loaded: false,
    error: '',
}

export function fightsReducer(state = initialState, action: fightActions.FightAction): FightsState {
    switch (action.type) {
        case fightActions.FightsActionTypes.LOAD_FIGHTS:
            return {
                ...state,
                loading: true,
            };
        case fightActions.FightsActionTypes.LOAD_FIGHTS_SUCCESS:
            return {
                ...state,
                fights: action.payload.fights,
                loaded: true,
                loading: false,
            };
        case fightActions.FightsActionTypes.LOAD_FIGHTS_FAIL:
            return {
                ...state,
                fights: [],
                loaded: false,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

const getFightsFeatureState = createFeatureSelector<FightsState>('fights');

export const getFights = createSelector(
    getFightsFeatureState,
    (state: FightsState) => state.fights
);

export const getFightsLoading = createSelector(
    getFightsFeatureState,
    (state: FightsState) => state.loading
);

export const getFightsLoaded = createSelector(
    getFightsFeatureState,
    (state: FightsState) => state.loaded
);

export const getFightsFail = createSelector(
    getFightsFeatureState,
    (state: FightsState) => state.error
);

