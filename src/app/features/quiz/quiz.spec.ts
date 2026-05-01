import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Quiz } from './quiz';
import { QuizService } from '../../core/services/quiz';

describe('Quiz', () => {
  let fixture: ComponentFixture<Quiz>;
  let component: Quiz;
  let quizService: QuizService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quiz],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);
    quizService.restart();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a non-empty question text', () => {
    const title = fixture.nativeElement.querySelector('.question-text') as HTMLElement;
    expect(title?.textContent?.trim().length).toBeGreaterThan(0);
  });

  it('should disable Submit button when no answer is selected', () => {
    const btn = fixture.nativeElement.querySelector('.action-btn') as HTMLButtonElement;
    expect(btn?.disabled).toBe(true);
  });

  it('should show results card when quiz is complete', () => {
    quizService.quizComplete.set(true);
    fixture.detectChanges();
    const results = fixture.nativeElement.querySelector('.results-card');
    expect(results).not.toBeNull();
  });

  it('should show progress bar on active question', () => {
    const bar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(bar).not.toBeNull();
  });

  it('getOptionText should return option text for key', () => {
    const q = quizService.currentQuestion();
    const text = component.getOptionText(q.options, q.correctKey);
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
