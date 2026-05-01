import { Signal } from '@angular/core';
import { QuizQuestion, AnswerKey, UserAnswer } from '../models/quiz';
import { SeoMeta } from './seo';

export interface IQuizService {
  readonly questions: Signal<QuizQuestion[]>;
  readonly totalQuestions: number;
  readonly currentIndex: Signal<number>;
  readonly answers: Signal<UserAnswer[]>;
  readonly quizComplete: Signal<boolean>;
  readonly currentQuestion: Signal<QuizQuestion>;
  readonly score: Signal<number>;
  readonly percentage: Signal<number>;
  submitAnswer(selectedKey: AnswerKey): void;
  nextQuestion(): void;
  restart(): void;
}

export interface ISeoService {
  updateMeta(seo: SeoMeta): void;
  setJsonLd(schema: object): void;
}
