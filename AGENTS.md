# AGENTS.md — U.S. Civics Quiz Webapp

This file is the primary entry point for AI coding agents. Read it before touching any code.

---

## Project at a Glance

An Angular 19 SSR quiz app serving 10 randomized questions drawn from the 128-question USCIS 2025 Civics Test bank. Infrastructure is AWS CDK: CloudFront → Lambda (SSR) → S3 (static assets). State is managed entirely with Angular signals — no RxJS, no NgRx. Deployed as a server-side-rendered app for full SEO coverage.

---

## Quick-Start Commands

```bash
npm start                        # dev server on http://localhost:4200
npm test                         # Vitest unit tests (watch mode)
npm run test:coverage            # Vitest with coverage report
npm run build                    # development build
npm run build:prod               # production SSR build (copies run.sh into dist/)
npm run ssr:local                # production build + run Express SSR server locally
npm run infra:diff               # CDK diff for dev environment (no deploy)
npm run infra:deploy:dev         # deploy to dev
npm run infra:deploy:prod        # deploy to prod (no approval prompt)
```

---

## Repository Map

```
quiz-webapp/
├── src/
│   ├── app/
│   │   ├── app.ts / app.html / app.scss   # root shell (navbar + footer + router-outlet)
│   │   ├── app.routes.ts                  # top-level routes (lazy-loads quiz feature)
│   │   ├── app.config.ts                  # Angular ApplicationConfig + providers
│   │   ├── core/
│   │   │   ├── constants/quiz.ts          # USCIS question bank, config constants, DI tokens
│   │   │   ├── models/quiz.ts             # AnswerKey, QuizOption, QuizQuestion, UserAnswer
│   │   │   └── services/
│   │   │       ├── quiz.ts                # QuizService — all quiz state (signals)
│   │   │       ├── quiz.spec.ts
│   │   │       ├── interfaces.ts          # IQuizService, ISeoService
│   │   │       ├── seo.ts                 # SeoService — meta tags, OG, Twitter, JSON-LD
│   │   │       └── seo.spec.ts
│   │   ├── features/
│   │   │   ├── quiz/
│   │   │   │   ├── quiz.ts / quiz.html / quiz.scss   # main quiz component
│   │   │   │   ├── quiz.routes.ts         # QUIZ_ROUTES + quizSeoResolver
│   │   │   │   ├── quiz.routes.spec.ts
│   │   │   │   └── quiz.spec.ts
│   │   │   └── not-found/                 # 404 page
│   │   └── shared/
│   │       └── components/
│   │           ├── navbar/
│   │           └── footer/
│   ├── main.ts / main.server.ts           # browser + server entry points
│   └── server.ts                          # Express server (Lambda Web Adapter target)
├── infra/
│   ├── bin/infra.ts                       # CDK app entry
│   └── lib/
│       ├── infra-stack.ts                 # stack orchestration
│       └── constructs/
│           ├── static-assets.ts           # S3 + cache strategy
│           ├── ssr-lambda.ts              # Lambda Function URL
│           ├── quiz-table.ts              # DynamoDB table (provisioned, not yet wired)
│           └── monitoring.ts              # CloudWatch alarms + SNS
├── docs/
│   ├── architecture.md
│   ├── design.md
│   ├── deployment.md
│   └── testing.md
├── AGENTS.md                              # ← you are here
└── README.md
```

---

## Conventions — Do / Don't

**State & reactivity**
- DO use `signal()` and `computed()` for all reactive state — no RxJS Subjects or BehaviorSubjects in new code
- DO read signals in templates directly (e.g., `quiz.percentage()`) — no async pipe needed

**Components**
- DO keep every component standalone (`standalone: true` is the default in Angular 19 — no NgModule)
- DO import only the Angular Material modules a component actually uses
- DO use functional `inject()` at the field level, not constructor parameter injection

**Testing**
- DO write a Vitest spec co-located with every new service or component
- DO use `TestBed.runInInjectionContext(() => resolver(...))` to test functional resolvers
- DO use `vi.fn()` for mocks; call `vi.clearAllMocks()` in `beforeEach`

**SEO**
- DO NOT call `seo.updateMeta()` or `seo.setJsonLd()` inside `ngOnInit`
- DO set SEO in the route resolver (`quizSeoResolver` in `quiz.routes.ts`) — resolvers run before component activation, which is the correct SSR timing

**Question bank**
- DO NOT edit question text, options, or `correctKey` values in `core/constants/quiz.ts` — content is sourced verbatim from USCIS M-1778 09/25
- DO NOT add or remove questions without updating the inline source comment

**Infrastructure**
- DO NOT wire `QuizTable` to the Lambda yet — the DynamoDB table is provisioned but intentionally disconnected pending the leaderboard feature
- DO NOT manually set Lambda environment variables — they are fully managed by the `SsrLambda` CDK construct

---

## Deeper Documentation

| Topic | File |
|---|---|
| Package layering, data flow, runtime architecture | [docs/architecture.md](docs/architecture.md) |
| Key design decisions with rationale and trade-offs | [docs/design.md](docs/design.md) |
| CDK deploy workflow, environment config, monitoring | [docs/deployment.md](docs/deployment.md) |
| Test runner, patterns, coverage expectations | [docs/testing.md](docs/testing.md) |
