import { Question } from "./question.model";

export class Fight {
    id?: string;
    agressorId!: string;
    agressorCorrectAnswers!: number;
    defenderId?: string;
    defenderCorrectAnswers?: string;
    isFinished?: boolean;
    winnerId?: string;

    constructor(fight: Fight) {
        this.agressorId = fight.agressorId;
        this.agressorCorrectAnswers = fight.agressorCorrectAnswers;
        this.defenderId = fight.defenderId;
        this.defenderCorrectAnswers = fight.defenderCorrectAnswers ?? undefined;
        this.isFinished = fight.isFinished ?? false;
        this.winnerId = fight.winnerId ?? undefined;
    }
}