import { Injectable, signal, computed, inject } from '@angular/core';
import { QUESTION_BANK, QUIZ_POOL_SIZE } from '../constants/quiz';
import { QuizQuestion, AnswerKey, UserAnswer } from '../models/quiz';

@Injectable({ providedIn: 'root' })
export class QuizService {
  readonly #bank = inject(QUESTION_BANK);

  readonly questions = signal<QuizQuestion[]>(this.#sample());
  readonly totalQuestions = QUIZ_POOL_SIZE;

  readonly currentIndex = signal(0);
  readonly answers = signal<UserAnswer[]>([]);
  readonly quizComplete = signal(false);

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly score = computed(() => this.answers().filter(a => a.isCorrect).length);
  readonly percentage = computed(() =>
    Math.round((this.score() / this.totalQuestions) * 100),
  );

  #sample(): QuizQuestion[] {
    const pool = [...this.#bank];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, QUIZ_POOL_SIZE);
  }

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
    this.questions.set(this.#sample());
    this.currentIndex.set(0);
    this.answers.set([]);
    this.quizComplete.set(false);
  }
}
