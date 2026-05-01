import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/quiz/quiz.routes').then(m => m.QUIZ_ROUTES),
    title: 'Quiz App - Test Your Knowledge',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found').then(m => m.NotFound),
    title: '404 — Page Not Found',
  },
];
