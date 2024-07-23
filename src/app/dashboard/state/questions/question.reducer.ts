import * as questionsActions from './question.action';
import * as fromRoot from '../../../state/app-state.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Question } from 'src/app/shared/models/question.model';

export interface QuestionsState {
    questions: Question[],
    loading: boolean,
    loaded: boolean,
    error: string,
}

export interface AppState extends fromRoot.AppState {
    questions: QuestionsState,
}

export const initialState: QuestionsState = {
    questions: [],
    loading: false,
    loaded: false,
    error: '',
}

export function questionReducer(state = initialState, action: questionsActions.QuestionAction): QuestionsState {
    switch (action.type) {
        case questionsActions.QuestionsActionTypes.LOAD_QUESTIONS:
            return {
                ...state,
                loading: true,
            };
        case questionsActions.QuestionsActionTypes.LOAD_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: action.payload.questions,
                loaded: true,
                loading: false,
            };
        case questionsActions.QuestionsActionTypes.LOAD_QUESTIONS_FAIL:
            return {
                ...state,
                questions: [],
                loaded: false,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

const getQuestionsFeatureState = createFeatureSelector<QuestionsState>('questions');

export const getQuestions = createSelector(
    getQuestionsFeatureState,
    (state: QuestionsState) => state.questions
);

export const getQuestionsLoading = createSelector(
    getQuestionsFeatureState,
    (state: QuestionsState) => state.loading
);

export const getQuestionsLoaded = createSelector(
    getQuestionsFeatureState,
    (state: QuestionsState) => state.loaded
);

export const getQuestionsFail = createSelector(
    getQuestionsFeatureState,
    (state: QuestionsState) => state.error
);

