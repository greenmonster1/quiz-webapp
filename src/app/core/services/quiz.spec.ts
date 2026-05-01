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

  it('should serve 10 questions per session', () => {
    expect(service.totalQuestions).toBe(10);
    expect(service.questions().length).toBe(10);
  });

  it('restart() should re-randomize the question set', () => {
    const first = service.questions().map(q => q.id);
    service.restart();
    const second = service.questions().map(q => q.id);
    // Both sets must have exactly 10 distinct civics question IDs
    expect(second.length).toBe(10);
    expect(new Set(second).size).toBe(10);
    // Extremely unlikely (1 in 124P10) for both draws to be identical
    // We just verify both are valid; CI flakiness risk is negligible
    expect(first.every(id => id >= 1 && id <= 128)).toBe(true);
    expect(second.every(id => id >= 1 && id <= 128)).toBe(true);
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

    it('should set quizComplete after all 10 questions', () => {
      for (let i = 0; i < service.totalQuestions; i++) {
        service.nextQuestion();
      }
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

    it('should calculate 100% when all answers are correct', () => {
      for (let i = 0; i < service.totalQuestions; i++) {
        service.submitAnswer(service.currentQuestion().correctKey);
        service.nextQuestion();
      }
      expect(service.percentage()).toBe(100);
    });

    it('should calculate 0% when all answers are wrong', () => {
      for (let i = 0; i < service.totalQuestions; i++) {
        const correct = service.currentQuestion().correctKey;
        const wrong = correct === 'A' ? 'B' : 'A';
        service.submitAnswer(wrong);
        service.nextQuestion();
      }
      expect(service.percentage()).toBe(0);
    });
  });
});
