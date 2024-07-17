import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromQuestions from '../../../dashboard/state/questions/question.reducer';
import * as questionsActions from '../../../dashboard/state/questions/question.action';
import { Question } from '../../models/question.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

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

  constructor(private store: Store<fromQuestions.AppState>) { }

  ngOnInit(): void {
    this.subscribeOnStore();
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
    if (this.isModalVisible) {
      this.getQuestions();
    }
  }

  selectAnswer(index: number): void {
    this.activeQuestion.answers.forEach((item) => item.selected = false);
    this.activeQuestion.answers[index].selected = true;
  }

  nextQuestion(): void {
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
        this.questions = questions;
        this.activeQuestionIndex = 0;
        this.activeQuestion = this.questions[this.activeQuestionIndex];
      });
  }
}
