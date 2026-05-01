import { ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Quiz } from './quiz';
import { SeoService } from '../../core/services/seo';
import { QUIZ_TITLE, QUIZ_DESCRIPTION, SITE_URL } from '../../core/constants/quiz';

export const quizSeoResolver: ResolveFn<void> = () => {
  const seo = inject(SeoService);
  seo.updateMeta({ title: QUIZ_TITLE, description: QUIZ_DESCRIPTION, url: SITE_URL });
  seo.setJsonLd({
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
};

export const QUIZ_ROUTES: Routes = [
  { path: '', component: Quiz, resolve: { seo: quizSeoResolver } },
];
