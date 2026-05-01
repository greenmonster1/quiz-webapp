# Architecture

## Domain Concepts

The quiz domain has exactly three concepts:

| Concept | Type | Location |
|---|---|---|
| `QuizQuestion` | Data — a question with four options and a correct answer key | `core/models/quiz.ts` |
| `UserAnswer` | Interaction — the key a user selected for a question, and whether it was correct | `core/models/quiz.ts` |
| Quiz session state | Reactive state — signals tracking current question, answers, completion | `core/services/quiz.ts` |

There is no backend at runtime. All 128 questions are bundled at build time in `core/constants/quiz.ts`.

---

## Package Layering

```
features/quiz          →  core/services  →  core/models
                       →  core/constants
shared/components      →  (no core dependency)
```

The dependency rule: **outer layers may import from inner layers, never the reverse.** `core/` must never import from `features/` or `shared/`.

`core/constants/quiz.ts` is the single source of truth for quiz configuration: question bank, pool size, site metadata, DI tokens, and feedback thresholds.

---

## Angular Module Structure

All components are standalone — there are no NgModules. The tree is:

```
AppComponent (root shell)
  ├── NavbarComponent
  ├── FooterComponent
  └── RouterOutlet
        └── [lazy] Quiz feature
              └── Quiz component
```

Route configuration:

- `app.routes.ts` — top-level routes; the root path lazily loads `QUIZ_ROUTES` from the quiz feature; `**` loads `NotFound`
- `quiz.routes.ts` — defines `QUIZ_ROUTES` with `quizSeoResolver` on the root path

`appConfig` (in `app.config.ts`) wires providers: router, hydration, HTTP, animations, and Material icon defaults.

---

## Runtime Data Flow

Two distinct request paths:

### SSR path (dynamic content)
```
Browser → CloudFront → Lambda Function URL
       → Lambda Web Adapter → Express server (server.ts)
       → Angular SSR (main.server.ts) → renders full HTML
       → CloudFront → Browser (hydrates with event replay)
```
- Cache policy: no-store (Lambda origin)
- Method: GET/HEAD only

### Static path (build artifacts)
```
Browser → CloudFront → S3 (Origin Access Control)
```
Routing rules:
- `/assets/*`, `/*.js`, `/*.css`, `/*.ico` → S3 with `immutable, max-age=31536000` (1 year; files are content-hashed)
- `/index.html` → S3 with `no-cache` (must revalidate; prevents serving a stale manifest after deploy)

---

## State Management

`QuizService` is the single owner of all quiz state. It exposes only signals and computed values — no methods return mutable references.

```
QuizService (signals)
  questions        — QuizQuestion[] (sampled at session start)
  currentIndex     — number
  answers          — UserAnswer[]
  quizComplete     — boolean

  currentQuestion  — computed from questions + currentIndex
  score            — computed from answers
  percentage       — computed from score / totalQuestions
```

The `Quiz` component injects `QuizService` and owns two local UI signals (`selectedKey`, `submitted`) that live only for the current question interaction. They reset on every `next()` call.

---

## Infrastructure Constructs

```
infra-stack.ts  (orchestration)
  ├── StaticAssets     — S3 bucket + two BucketDeployments (hashed assets vs index.html)
  │                      Origin Access Control for CloudFront → S3
  ├── SsrLambda        — nodejs24.x / arm64 Lambda, Lambda Web Adapter layer (v24)
  │                      Function URL (auth: NONE), CloudFront HttpOrigin
  ├── QuizTable        — DynamoDB `quiz-attempts` (PK+SK, GSI1 for leaderboard)
  │                      PAY_PER_REQUEST, PITR enabled, RETAIN removal policy
  │                      NOT yet connected to Lambda (intentional)
  └── Monitoring       — SNS topic → two CloudWatch alarms
                         LambdaErrors: ≥1 error per 5 min
                         LambdaSlow: P99 duration > 8000 ms
```

CloudFront is configured directly in `infra-stack.ts` (not extracted into a construct) because it ties all origins together.
