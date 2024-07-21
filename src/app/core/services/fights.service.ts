import { Injectable } from '@angular/core';
import { Answer, Question } from 'src/app/shared/models/question.model';
import { StorageKeys, StorageService } from './storage.service';
import { Fight } from 'src/app/shared/models/fight.model';
import { FightResults } from 'src/app/shared/enums/fight-results.enum';
import { FightMessages } from 'src/app/shared/enums/fight-messages.enum';

@Injectable({
  providedIn: 'root'
})
export class FightsService {

  constructor(private storageService: StorageService) { }

  mapQuestionsToFight(questions: Question[]): Fight | null {
    let correctAnswersAmount = this.countCorrectAnswers(questions);
      return new Fight({
        agressorId: this.userId,
        agressorCorrectAnswers: correctAnswersAmount,
      });
  }

  countCorrectAnswers(questions: Question[]): number {
    return questions
    .flatMap((question: Question) => question.answers)
    .reduce((count, answer: Answer) => {
      return count + (answer.isCorrect && answer.selected ? 1 : 0);
    }, 0);
  }

  getTitle(fight: Fight): FightResults {
    if (!fight.isFinished) {
      return FightResults.Pending;
    }
    if (fight.winnerId === this.userId) {
      return FightResults.Victory;
    } else if (fight.winnerId === 'Draft') {
      return FightResults.Draft;
    } else {
      return FightResults.Defeat;
    }
  }

  getMessage(fight: Fight): FightMessages {
    if (!fight.isFinished) {
      return fight.agressorId === this.userId ? 
        FightMessages.PendingAttack :
        FightMessages.PendingDefence;
    }
    if (fight.winnerId === this.userId) {
      return FightMessages.Victory;
    } else if (fight.winnerId === 'Draft') {
      return FightMessages.Draft;
    } else {
      return FightMessages.Defeat;
    }
  }

  getFightImageSrc(fight: Fight): string {
    if (fight.winnerId === this.userId || fight.winnerId === 'Draft') {
      return './assets/images/sword.svg';
    } else {
      return './assets/images/shield.svg';
    }
  }

  private get userId(): string {
    return this.storageService.getItem(StorageKeys.User).id;
  }
}
