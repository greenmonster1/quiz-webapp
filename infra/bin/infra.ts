#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { QuizWebappStack } from '../lib/infra-stack';
import { environments } from '../lib/config/environments';

const app = new cdk.App();

const envName = (app.node.tryGetContext('env') as string) ?? 'dev';
const envConfig = environments[envName];

if (!envConfig) {
  throw new Error(
    `Unknown environment: "${envName}". Available: ${Object.keys(environments).join(', ')}`,
  );
}

new QuizWebappStack(app, `QuizWebapp-${envName}`, {
  env: {
    account: envConfig.account ?? process.env['CDK_DEFAULT_ACCOUNT'],
    region: envConfig.region,
  },
  envConfig,
  tags: {
    project: 'quiz-app',
    Environment: envName,
  },
});
