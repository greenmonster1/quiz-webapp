# U.S. Civics Quiz Webapp

An Angular 19 SSR quiz app serving 10 randomized questions from the 128-question USCIS 2025 Civics Test bank. Deployed on AWS as a CloudFront + Lambda + S3 stack.

## Getting Started

```bash
npm install
npm start          # dev server on http://localhost:4200
npm test           # Vitest unit tests
npm run ssr:local  # production SSR build + run locally
```

## Documentation

| Topic | File |
|---|---|
| Agent conventions, repo map, quick-start | [AGENTS.md](AGENTS.md) |
| Package layering, runtime data flow, infra constructs | [docs/architecture.md](docs/architecture.md) |
| Key design decisions with rationale and trade-offs | [docs/design.md](docs/design.md) |
| CDK deploy workflow, environment config, monitoring | [docs/deployment.md](docs/deployment.md) |
| Test runner, patterns, coverage expectations | [docs/testing.md](docs/testing.md) |

## Tech Stack

- **Frontend:** Angular 19, Angular Material, SCSS, SSR (Angular Universal)
- **State:** Angular signals — no RxJS, no NgRx
- **Infrastructure:** AWS CDK — CloudFront, Lambda (arm64), S3, DynamoDB, CloudWatch
- **Tests:** Vitest via `@angular/build:unit-test`
