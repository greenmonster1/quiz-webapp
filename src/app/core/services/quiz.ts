import { Injectable, signal, computed } from '@angular/core';
import { QUIZ_QUESTIONS } from '../constants/quiz';
import { QuizQuestion, AnswerKey, UserAnswer } from '../models/quiz';

@Injectable({ providedIn: 'root' })
export class QuizService {
  readonly questions: QuizQuestion[] = QUIZ_QUESTIONS;
  readonly totalQuestions = this.questions.length;

  readonly currentIndex = signal(0);
  readonly answers = signal<UserAnswer[]>([]);
  readonly quizComplete = signal(false);

  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);
  readonly score = computed(() => this.answers().filter(a => a.isCorrect).length);
  readonly percentage = computed(() =>
    Math.round((this.score() / this.totalQuestions) * 100),
  );

  submitAnswer(selectedKey: AnswerKey): void {
    const q = this.currentQuestion();
    const isCorrect = selectedKey === q.correctKey;
    this.answers.update(prev => [
      ...prev,
      { questionId: q.id, selectedKey, isCorrect },
    ]);
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.totalQuestions - 1) {
      this.currentIndex.update(i => i + 1);
    } else {
      this.quizComplete.set(true);
    }
  }

  restart(): void {
    this.currentIndex.set(0);
    this.answers.set([]);
    this.quizComplete.set(false);
  }
}
