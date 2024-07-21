import { Action } from '@ngrx/store';
import { Fight } from 'src/app/shared/models/fight.model';

export enum FightsActionTypes {
    LOAD_FIGHTS = '[Fights] Load fights',
    LOAD_FIGHTS_SUCCESS = '[Fights] Load fights success',
    LOAD_FIGHTS_FAIL = '[Fights] Load fights fail',
};

export class LoadFights implements Action {
    readonly type = FightsActionTypes.LOAD_FIGHTS;
}

export class LoadFightsSuccess implements Action {
    readonly type = FightsActionTypes.LOAD_FIGHTS_SUCCESS;
    constructor(public payload: { fights: Fight[] }) {}
}

export class LoadFightsFail implements Action {
    readonly type = FightsActionTypes.LOAD_FIGHTS_FAIL;
    constructor (public payload: string) {}
}

export type FightAction = LoadFights | LoadFightsSuccess | LoadFightsFail;