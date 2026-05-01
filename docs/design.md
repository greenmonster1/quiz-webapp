# Design Decisions

Each entry: **decision → rationale → trade-off.**

---

## 1. Signals over RxJS

Angular `signal()` and `computed()` are used exclusively for reactive state in `QuizService` and the `Quiz` component. RxJS Observables are not used.

**Rationale:** Simpler mental model — no subscription lifecycle, no memory leak risk, no pipe chains. Angular 19 schedules change detection natively around signal reads, so components only re-render when a signal they read changes.

**Trade-off:** No reactive operators (debounce, switchMap, etc.) without wrapping signals in `toObservable()`. Acceptable at this app's complexity level.

---

## 2. Standalone Components

Every component uses `standalone: true` (the Angular 19 default). There are no NgModules anywhere in the app.

**Rationale:** Angular 19 default; simpler testing (`imports: [MyComponent]` instead of module declarations); tree-shaking at component level rather than module level.

**Trade-off:** None at this scale.

---

## 3. SSR and Prerender Strategy

The quiz route is server-side rendered. Angular's `RenderMode.Prerender` generates static HTML at build time for routes that are known ahead of deployment; `RenderMode.Server` handles dynamic or unknown paths.

**Rationale:** The quiz landing page is SEO-critical (civics content indexed by search engines). Prerendering gives zero cold-start latency and a full Lighthouse score without runtime server cost for the initial page load.

**Trade-off:** Prerendering runs at build time, so any change to the initial HTML (e.g., updated question bank) requires a new deploy. Acceptable because the question bank is bundled anyway.

---

## 4. SEO via Route Resolver

SEO metadata (`<title>`, Open Graph tags, JSON-LD) is set in `quizSeoResolver`, a functional `ResolveFn<void>` registered on the quiz route in `quiz.routes.ts`. It is not set in `ngOnInit`.

**Rationale:** Angular resolvers execute during navigation, before the component is instantiated. In SSR, this means meta tags are written to the server-rendered HTML before the component tree renders — which is the correct timing for search engine crawlers and social media previews. Placing it in `ngOnInit` would work on the client but risks a timing gap on the server.

Additionally, this keeps the `Quiz` component focused on a single responsibility: quiz UI state.

**Trade-off:** The resolver pattern is less obvious to developers unfamiliar with Angular routing. The `AGENTS.md` convention rules document this explicitly.

---

## 5. `QUESTION_BANK` Injection Token

`QuizService` does not import `CIVICS_QUESTION_BANK` directly. Instead it injects a `QUESTION_BANK` token defined in `core/constants/quiz.ts`:

```typescript
export const QUESTION_BANK = new InjectionToken<QuizQuestion[]>('QUESTION_BANK', {
  providedIn: 'root',
  factory: () => CIVICS_QUESTION_BANK,
});
```

**Rationale:** Satisfies the Open/Closed Principle — `QuizService` is open to different question banks (test doubles, future exam types) without modifying its source. The factory default means no explicit `provide` is needed in `app.config.ts` or test `TestBed` setup.

**Trade-off:** Slightly more indirection than a direct import. The token name makes the intent clear.

---

## 6. `FEEDBACK_THRESHOLDS` Constant

Score-to-message mapping is defined as a typed `FeedbackTier[]` constant in `core/constants/quiz.ts`, not as an inline if-chain in the component.

**Rationale:** Passing thresholds and feedback messages are policy, not presentation logic. Defining them in the constants layer means they can be updated in one place and reused if a server-side scoring feature is added later.

**Trade-off:** A trivial indirection. Worth it because the if-chain would silently allow threshold drift if the same logic were duplicated.

---

## 7. DynamoDB Single-Table Design

The `quiz-attempts` table uses a single-table pattern:

- PK: `ATTEMPT#<sessionId>`, SK: `QUESTION#<questionId>` — stores individual attempt records
- GSI1: PK = `LEADERBOARD`, SK = `SCORE#<zero-padded-score>#<timestamp>` — ordered leaderboard queries

**Rationale:** Single-table design avoids joins, keeps read costs predictable, and supports the leaderboard access pattern without a full table scan.

**Trade-off:** Less intuitive than a normalized schema. The access patterns are documented here so the design intent is preserved when the feature is eventually wired up.

**Status:** The table is provisioned with a `RETAIN` removal policy. It is intentionally not connected to the Lambda (no IAM permissions, no environment variables) until the leaderboard feature is scoped.

---

## 8. Lambda Web Adapter

The Express server (`src/server.ts`) runs unchanged on Lambda via the [AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter) layer (arm64, layer version 24). The Lambda handler is `run.sh`.

**Rationale:** Zero Lambda-SDK code in the Express server — it stays runnable locally with `npm run ssr:local` without any mocking or shim layer. CloudFront calls the Lambda Function URL server-to-server; Lambda Web Adapter translates HTTP events to the Express request/response cycle.

**Trade-off:** An extra layer dependency (layer ARN and version) must be updated when the Lambda runtime is upgraded. Tracked in `infra/lib/constructs/ssr-lambda.ts`.
