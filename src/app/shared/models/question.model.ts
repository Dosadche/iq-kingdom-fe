import { DBEntity } from "./db-entity.model";

export interface Question extends DBEntity {
    answers: Answer[],
}

export interface Answer extends DBEntity{
    isCorrect: boolean,
    selected?: boolean,
}