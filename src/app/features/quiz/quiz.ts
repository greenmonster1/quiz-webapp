import { Component, inject, signal, OnInit } from '@angular/core';
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
import { SeoService } from '../../core/services/seo';
import { AnswerKey, QuizOption } from '../../core/models/quiz';
import { QUIZ_TITLE, QUIZ_DESCRIPTION, SITE_URL } from '../../core/constants/quiz';

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
export class Quiz implements OnInit {
  readonly quiz = inject(QuizService);
  private readonly seo = inject(SeoService);

  readonly selectedKey = signal<AnswerKey | null>(null);
  readonly submitted = signal(false);

  ngOnInit(): void {
    this.seo.updateMeta({
      title: QUIZ_TITLE,
      description: QUIZ_DESCRIPTION,
      url: SITE_URL,
    });
    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: QUIZ_TITLE,
      description: QUIZ_DESCRIPTION,
      url: SITE_URL,
      potentialAction: {
        '@type': 'QuizAction',
        name: 'Take the Quiz',
        target: SITE_URL,
      },
    });
  }

  get progressValue(): number {
    return Math.round(((this.quiz.currentIndex() + 1) / this.quiz.totalQuestions) * 100);
  }

  get isLastQuestion(): boolean {
    return this.quiz.currentIndex() >= this.quiz.totalQuestions - 1;
  }

  get feedbackMessage(): string {
    const pct = this.quiz.percentage();
    if (pct >= 80) return 'Excellent! You\'re a trivia master! 🏆';
    if (pct >= 50) return 'Good effort! Keep practicing. 💪';
    return 'Keep studying — you\'ll get there! 📚';
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
