import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { quizSeoResolver } from './quiz.routes';
import { SeoService } from '../../core/services/seo';

const mockSeoService = {
  updateMeta: vi.fn(),
  setJsonLd: vi.fn(),
};

describe('quizSeoResolver', () => {
  const executeResolver: ResolveFn<void> = (...args) =>
    TestBed.runInInjectionContext(() => quizSeoResolver(...args));

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: SeoService, useValue: mockSeoService }],
    });
  });

  it('should call SeoService.updateMeta with quiz metadata', () => {
    executeResolver({} as any, {} as any);
    expect(mockSeoService.updateMeta).toHaveBeenCalledOnce();
    expect(mockSeoService.updateMeta.mock.calls[0][0].title).toContain('Civics');
  });

  it('should inject a Quiz JSON-LD schema', () => {
    executeResolver({} as any, {} as any);
    expect(mockSeoService.setJsonLd).toHaveBeenCalledOnce();
    const [schema] = mockSeoService.setJsonLd.mock.calls[0];
    expect((schema as Record<string, string>)['@type']).toBe('Quiz');
  });
});
