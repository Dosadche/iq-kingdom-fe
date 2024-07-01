import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from '../../consts/test-questions.const';

@Component({
  selector: 'app-fight-modal',
  templateUrl: './fight-modal.component.html',
  styleUrls: ['./fight-modal.component.scss']
})
export class ModalComponent implements OnInit {
  isModalVisible: boolean = false;
  QUESTIONS = QUESTIONS;
  activeQuestionIndex = 0
  activeQuestion = QUESTIONS[this.activeQuestionIndex];

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  selectAnswer(index: number): void {
    this.activeQuestion.answers.forEach((item) => item.selected = false);
    this.activeQuestion.answers[index].selected = true;
  }

  nextQuestion(): void {
    this.activeQuestionIndex = this.activeQuestionIndex + 1;
    this.activeQuestion = this.QUESTIONS[this.activeQuestionIndex];
  }
}
