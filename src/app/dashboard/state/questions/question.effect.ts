import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as questionActions from "./question.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { QuestionsRestService } from "src/app/core/services/rest/questions-rest.service";
import { Question } from "src/app/shared/models/question.model";

@Injectable()
export class QuestionEffect {
    constructor(
        private actions$: Actions,
        private questionsRESTService: QuestionsRestService) {}
    
    loadRandomQuestions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(questionActions.QuestionsActionTypes.LOAD_QUESTIONS),
            mergeMap((_action: questionActions.LoadQuestions) => {
                return this.questionsRESTService.getRandom().pipe(
                    map((questions: Question[]) => 
                        new questionActions.LoadQuestionSuccess({ questions })),
                    catchError((err) => {
                        return of(new questionActions.LoadQuestionsFail(err.error.message))})
                )
            })
        )
    });
}