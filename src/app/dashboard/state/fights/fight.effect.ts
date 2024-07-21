import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fightActions from "./fight.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { FightsRestService } from "src/app/core/services/rest/fights-rest.service";
import { StorageKeys, StorageService } from "src/app/core/services/storage.service";
import { Fight } from "src/app/shared/models/fight.model";

@Injectable()
export class FightEffect {
    constructor(
        private actions$: Actions,
        private fightRESTService: FightsRestService,
        private storageService: StorageService) {}
    
    loadFights$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fightActions.FightsActionTypes.LOAD_FIGHTS),
            mergeMap((_action: fightActions.LoadFights) => {
                const userId = this.storageService.getItem(StorageKeys.User).id;
                return this.fightRESTService.getByUserId(userId).pipe(
                    map((fights: Fight[]) => 
                        new fightActions.LoadFightsSuccess({ fights })),
                    catchError((err) => {
                        return of(new fightActions.LoadFightsFail(err.error.message))})
                )
            })
        )
    });
}