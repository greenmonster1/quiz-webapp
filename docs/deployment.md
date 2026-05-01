# Deployment

## Prerequisites

- Node.js 20 or later
- AWS CLI configured with credentials for the target account
- CDK bootstrapped in the target account/region:

```bash
cd infra
npx cdk bootstrap aws://<ACCOUNT_ID>/us-east-2 --context env=dev
```

Run bootstrap once per account/region. It provisions the CDK staging S3 bucket and IAM roles.

---

## Deploy Sequence

Every deploy is a two-step process: build the app, then deploy infrastructure (which uploads the build output to S3 and updates Lambda).

```bash
# 1. Production build — outputs to dist/quiz-webapp/
npm run build:prod

# 2. Deploy infrastructure + upload build artifacts
npm run infra:deploy:dev     # development environment
npm run infra:deploy:prod    # production (no approval prompt)
```

`build:prod` runs `ng build --configuration production` and copies `run.sh` into `dist/quiz-webapp/server/`. The `run.sh` script is required by the Lambda Web Adapter as the function handler — do not omit this step.

---

## CloudFront Cache Invalidation

After deploying, invalidate the CloudFront distribution to flush any cached responses:

```bash
aws cloudfront create-invalidation \
  --distribution-id <DistributionId> \
  --paths "/*"
```

`DistributionId` is printed as a CDK stack output after each deploy. For hashed JS/CSS assets this is not strictly necessary (content-addressed URLs change automatically), but it is required for `index.html` and SSR HTML responses.

---

## Environment Variables

Lambda environment variables are fully managed by the `SsrLambda` CDK construct (`infra/lib/constructs/ssr-lambda.ts`). Do not set them manually in the AWS console — CDK will overwrite them on the next deploy.

Managed variables:
- `PORT=8080` — Express server port (Lambda Web Adapter default)
- `NODE_ENV=production`
- `AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap` — Lambda Web Adapter bootstrap

---

## Monitoring

Two CloudWatch alarms are created automatically on deploy:

| Alarm | Condition | Action |
|---|---|---|
| `LambdaErrors` | ≥ 1 Lambda error in any 5-minute window | SNS → email |
| `LambdaSlow` | P99 duration > 8000 ms (approaching 10 s timeout) | SNS → email |

Alert email: `r.lakshman@gmail.com`. On the **first deploy**, AWS will send a subscription confirmation email to this address — you must click the confirmation link before alerts are delivered.

---

## DynamoDB

The `quiz-attempts` table is provisioned with `RemovalPolicy.RETAIN`. This means destroying the CDK stack does **not** delete the table — data is preserved across stack lifecycle events.

The table is **not yet connected** to the Lambda function. Do not add the table ARN as a Lambda environment variable or add IAM permissions until the leaderboard feature is scoped and implemented.

---

## Custom Domain (Optional)

Custom domain configuration is commented out in the infra stack. To enable:
1. Register a hosted zone in Route 53
2. Add `domainName` and `hostedZoneId` to the environment config in `infra/lib/infra-stack.ts`
3. The CDK construct will provision an ACM certificate and Route 53 alias record

This is out of scope for the current implementation.
