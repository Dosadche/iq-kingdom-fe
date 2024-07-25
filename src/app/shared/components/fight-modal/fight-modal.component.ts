import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromQuestions from '../../../dashboard/state/questions/question.reducer';
import * as questionsActions from '../../../dashboard/state/questions/question.action';
import * as fightActions from '../../../dashboard/state/fights/fight.action';
import * as notificationActions from '../../../dashboard/state/notifications/notification.action';
import * as userActions from '../../../dashboard/state/users/user.action';
import { Question } from '../../models/question.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize, Observable, take, tap } from 'rxjs';
import { FightsService } from 'src/app/core/services/fights.service';
import { Fight } from '../../models/fight.model';
import { FightsRestService } from 'src/app/core/services/rest/fights-rest.service';
import { ToasterService } from '../../services/toaster.service';
import { StorageKeys, StorageService } from 'src/app/core/services/storage.service';
import { ToasterSeverity } from '../../models/toaster-message.model';

@UntilDestroy()
@Component({
  selector: 'app-fight-modal',
  templateUrl: './fight-modal.component.html',
  styleUrls: ['./fight-modal.component.scss']
})
export class ModalComponent implements OnInit {
  isModalVisible: boolean = false;
  questions!: Question[];
  activeQuestionIndex = 0;
  activeQuestion!: Question;
  isLoading!: Observable<boolean>;
  isFightLoading: boolean = false;
  defenderId?: string;
  fightId?: string;
  private userId!: string;

  constructor(private store: Store<fromQuestions.AppState>,
              private fightsService: FightsService,
              private fightsRESTService: FightsRestService,
              private toasterService: ToasterService,
              private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.userId = this.storageService.getItem(StorageKeys.User).id;
    this.subscribeOnStore();
  }

  startAttack(defenderId: string): void {
    this.toggleModal();
    if (this.isModalVisible) {
      this.defenderId = defenderId;
      this.getQuestions();
    } else {
      this.defenderId = undefined;
    }
  }

  startDefence(fightId: string): void {
    this.toggleModal();
    if (this.isModalVisible) {
      this.fightId = fightId;
      this.getQuestions();
    } else {
      this.fightId = undefined;
    }
  }

  selectAnswer(index: number): void {
    this.activeQuestion.answers.forEach((item) => item.selected = false);
    this.activeQuestion.answers[index].selected = true;
  }

  nextQuestion(): void {
    if (this.activeQuestionIndex >= this.questions.length - 1) {
      const fight: Fight | null = this.fightsService
        .mapQuestionsToFight(this.questions);
      if (fight) {
        this.endFight(fight);
      }
      return;
    }
    this.activeQuestionIndex = this.activeQuestionIndex + 1;
    this.activeQuestion = this.questions[this.activeQuestionIndex];
  }

  private getQuestions(): void {
    this.store.dispatch(new questionsActions.LoadQuestions());
  }

  private subscribeOnStore(): void {
    this.isLoading = this.store.pipe(select(fromQuestions.getQuestionsLoading));
    this.store
      .pipe(
        select(fromQuestions.getQuestions),
        untilDestroyed(this))
      .subscribe((questions: Question[]) => {
        this.questions = JSON.parse(JSON.stringify(questions));
        this.activeQuestionIndex = 0;
        this.activeQuestion = this.questions[this.activeQuestionIndex];
      });
  }

  private endFight(fight: Fight): void {
    let request$: Observable<Fight>;
    if (this.defenderId) {
      request$ = this.fightsRESTService.attack(fight, this.defenderId)
        .pipe(
          tap(() => this.toasterService.toaster = {
            severity: ToasterSeverity.Success,
            message: 'Your attack has been sent successfully',
          }),
        );
    } else if (this.fightId) {
      const correctAnswersAmount = this.fightsService.countCorrectAnswers(this.questions);
      request$ = this.fightsRESTService.defend(this.fightId, correctAnswersAmount)
        .pipe(
          tap((fight: Fight) => {
            this.store.dispatch(new notificationActions.LoadNotifications({ 
              userId: this.userId 
            }));
            const toasterMessage = fight.winnerId === this.userId ? 
              'Congratulations! You won the battle!' :
              fight.winnerId === 'Draft' ?
              'Draft! You both were good.' :
              'You lost the battle.';
            this.toasterService.toaster = {
              severity: ToasterSeverity.Success,
              message: toasterMessage,
            }
          }),
        );
    } else {
      this.toasterService.toaster = {
        severity: ToasterSeverity.Error,
        message: 'Something went wrong',
      };
      return;
    }
    this.isFightLoading = true;
    request$
      .pipe(
        take(1),
        finalize(() => {
          this.isFightLoading = false;
          this.toggleModal();
        })).subscribe(() => {
          this.store.dispatch(new userActions.LoadUser({ id: this.userId }));
          this.store.dispatch(new fightActions.LoadFights());
        });
  }

  protected toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }
}
