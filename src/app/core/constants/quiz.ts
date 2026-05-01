import { QuizQuestion } from '../models/quiz';

export const SITE_URL = 'https://quiz-webapp.example.com';

export const QUIZ_TITLE = 'America 250 Quiz - Test Your Knowledge';
export const QUIZ_DESCRIPTION =
  'Celebrate America\'s 250th anniversary! Test your knowledge of US history, culture, and heritage.';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Which planet is known as the Red Planet?',
    options: [
      { key: 'A', text: 'Venus' },
      { key: 'B', text: 'Mars' },
      { key: 'C', text: 'Jupiter' },
      { key: 'D', text: 'Saturn' },
    ],
    correctKey: 'B',
  },
  {
    id: 2,
    text: 'What is the chemical symbol for Gold?',
    options: [
      { key: 'A', text: 'Ag' },
      { key: 'B', text: 'Go' },
      { key: 'C', text: 'Au' },
      { key: 'D', text: 'Gd' },
    ],
    correctKey: 'C',
  },
  {
    id: 3,
    text: 'Who painted the Mona Lisa?',
    options: [
      { key: 'A', text: 'Vincent van Gogh' },
      { key: 'B', text: 'Leonardo da Vinci' },
      { key: 'C', text: 'Pablo Picasso' },
      { key: 'D', text: 'Michelangelo' },
    ],
    correctKey: 'B',
  },
];
