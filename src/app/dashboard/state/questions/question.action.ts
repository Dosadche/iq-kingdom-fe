import { Action } from '@ngrx/store';
import { Question } from 'src/app/shared/models/question.model';

export enum QuestionsActionTypes {
    LOAD_QUESTIONS = '[Questions] Load questions',
    LOAD_QUESTIONS_SUCCESS = '[Questions] Load questions success',
    LOAD_QUESTIONS_FAIL = '[Questions] Load questions fail',
};

export class LoadQuestions implements Action {
    readonly type = QuestionsActionTypes.LOAD_QUESTIONS;
}

export class LoadQuestionSuccess implements Action {
    readonly type = QuestionsActionTypes.LOAD_QUESTIONS_SUCCESS;
    constructor (public payload: { questions: Question[] }) {}
}

export class LoadQuestionsFail implements Action {
    readonly type = QuestionsActionTypes.LOAD_QUESTIONS_FAIL;
    constructor (public payload: string) {}
}

export type QuestionAction = LoadQuestions | LoadQuestionSuccess | LoadQuestionsFail;

