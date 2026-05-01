# Testing

## Test Runner

[Vitest](https://vitest.dev/) via `@angular/build:unit-test`.

```bash
npm test               # run all specs in watch mode
npm run test:coverage  # run all specs with coverage report
```

---

## File Convention

Spec files are co-located with their source:

```
quiz.ts          ←  implementation
quiz.spec.ts     ←  spec
```

There is no `__tests__/` directory. If you add a new service or component, add a `*.spec.ts` file alongside it.

---

## Patterns

### Service tests

```typescript
import { TestBed } from '@angular/core/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

Angular signals are synchronous — read them directly in assertions without `async`/`await` or `fakeAsync`.

### Component tests

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MyComponent } from './my.component';
import { MyService } from '../services/my.service';

const mockMyService = { doSomething: vi.fn() };

describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [
        provideAnimations(),
        { provide: MyService, useValue: mockMyService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
  });
});
```

### Functional resolver tests

Resolvers cannot be called directly — they must run inside an injection context:

```typescript
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { myResolver } from './my.routes';

describe('myResolver', () => {
  const executeResolver: ResolveFn<void> = (...args) =>
    TestBed.runInInjectionContext(() => myResolver(...args));

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [...] });
  });

  it('should do something', () => {
    executeResolver({} as any, {} as any);
    // assert side effects
  });
});
```

---

## Coverage Expectations

| Area | Expectation |
|---|---|
| Service public methods | All methods covered |
| Component branches | All `@if` branches (quiz active, quiz complete, submitted, not submitted) |
| Getter logic | `feedbackMessage`, `progressValue`, `isLastQuestion` covered |
| Route resolvers | SEO side effects asserted in `quiz.routes.spec.ts` |

---

## What Is Not Tested

- **CDK infrastructure** — no CDK assertion tests are present (`infra/test/` is a placeholder)
- **Question bank content** — correctness of USCIS answers is not validated programmatically
- **SSR rendering** — no end-to-end or server-rendering tests; verified manually with `npm run ssr:local`
- **Animation timing** — Angular Material animations are disabled via `provideAnimations()` (not `provideAnimationsAsync()`) in specs; animation frame assertions are not needed

---

## Mocking

Use `vi.fn()` for all mock functions. Clear mocks in `beforeEach`:

```typescript
const mockSeoService = {
  updateMeta: vi.fn(),
  setJsonLd: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});
```

Do not use `vi.spyOn` on real service instances — always provide a mock object via `{ provide: ServiceClass, useValue: mockObject }`. This makes the test independent of the real service's implementation.
