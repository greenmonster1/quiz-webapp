export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  key: AnswerKey;
  text: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
  correctKey: AnswerKey;
}

export interface UserAnswer {
  questionId: number;
  selectedKey: AnswerKey;
  isCorrect: boolean;
}
