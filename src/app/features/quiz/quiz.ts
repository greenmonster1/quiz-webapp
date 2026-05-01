import { Component, inject, signal } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz';
import { AnswerKey, QuizOption } from '../../core/models/quiz';
import { FEEDBACK_THRESHOLDS } from '../../core/constants/quiz';

@Component({
  selector: 'app-quiz',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
  animations: [
    trigger('questionSlide', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(60px)' }),
        animate('280ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-60px)' }),
        animate('280ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class Quiz {
  readonly quiz = inject(QuizService);

  readonly selectedKey = signal<AnswerKey | null>(null);
  readonly submitted = signal(false);

  get progressValue(): number {
    return Math.round(((this.quiz.currentIndex() + 1) / this.quiz.totalQuestions) * 100);
  }

  get isLastQuestion(): boolean {
    return this.quiz.currentIndex() >= this.quiz.totalQuestions - 1;
  }

  get feedbackMessage(): string {
    const pct = this.quiz.percentage();
    const tier = FEEDBACK_THRESHOLDS.find(t => pct >= t.minPct);
    return tier?.message ?? '';
  }

  isCorrectOption(key: AnswerKey): boolean {
    return key === this.quiz.currentQuestion().correctKey;
  }

  isWrongSelection(key: AnswerKey): boolean {
    return this.submitted() && key === this.selectedKey() && !this.isCorrectOption(key);
  }

  isCorrectSelection(key: AnswerKey): boolean {
    return this.submitted() && this.isCorrectOption(key);
  }

  submit(): void {
    const key = this.selectedKey();
    if (!key) return;
    this.quiz.submitAnswer(key);
    this.submitted.set(true);
  }

  next(): void {
    this.quiz.nextQuestion();
    this.selectedKey.set(null);
    this.submitted.set(false);
  }

  restart(): void {
    this.quiz.restart();
    this.selectedKey.set(null);
    this.submitted.set(false);
  }

  getOptionText(options: QuizOption[], key: AnswerKey): string {
    return options.find(o => o.key === key)?.text ?? key;
  }
}
