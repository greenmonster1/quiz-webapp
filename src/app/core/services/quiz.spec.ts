import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
    service.restart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start at question 0', () => {
    expect(service.currentIndex()).toBe(0);
  });

  it('should have 3 questions', () => {
    expect(service.totalQuestions).toBe(3);
  });

  describe('submitAnswer', () => {
    it('should record a correct answer', () => {
      const correctKey = service.currentQuestion().correctKey;
      service.submitAnswer(correctKey);
      expect(service.answers().length).toBe(1);
      expect(service.answers()[0].isCorrect).toBe(true);
    });

    it('should record an incorrect answer', () => {
      const correctKey = service.currentQuestion().correctKey;
      const wrongKey = correctKey === 'A' ? 'B' : 'A';
      service.submitAnswer(wrongKey);
      expect(service.answers()[0].isCorrect).toBe(false);
    });
  });

  describe('nextQuestion', () => {
    it('should advance to the next question', () => {
      service.nextQuestion();
      expect(service.currentIndex()).toBe(1);
    });

    it('should set quizComplete after the last question', () => {
      service.nextQuestion();
      service.nextQuestion();
      service.nextQuestion();
      expect(service.quizComplete()).toBe(true);
    });
  });

  describe('restart', () => {
    it('should reset all state', () => {
      service.submitAnswer('A');
      service.nextQuestion();
      service.restart();
      expect(service.currentIndex()).toBe(0);
      expect(service.answers()).toEqual([]);
      expect(service.quizComplete()).toBe(false);
    });
  });

  describe('computed values', () => {
    it('should calculate score correctly', () => {
      const q1 = service.currentQuestion().correctKey;
      service.submitAnswer(q1);
      service.nextQuestion();
      const wrongKey = service.currentQuestion().correctKey === 'A' ? 'B' : 'A';
      service.submitAnswer(wrongKey);
      expect(service.score()).toBe(1);
    });

    it('should calculate percentage correctly', () => {
      service.submitAnswer(service.currentQuestion().correctKey);
      service.nextQuestion();
      service.submitAnswer(service.currentQuestion().correctKey);
      service.nextQuestion();
      service.submitAnswer(service.currentQuestion().correctKey);
      expect(service.percentage()).toBe(100);
    });
  });
});
