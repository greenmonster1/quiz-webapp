import * as cdk from 'aws-cdk-lib/core';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface MonitoringProps {
  lambdaFunction: lambda.Function;
  alertEmail: string;
}

export class Monitoring extends Construct {
  constructor(scope: Construct, id: string, props: MonitoringProps) {
    super(scope, id);

    const topic = new sns.Topic(this, 'AlertTopic', {
      displayName: 'Quiz Webapp Alerts',
    });
    topic.addSubscription(new subscriptions.EmailSubscription(props.alertEmail));
    const action = new actions.SnsAction(topic);

    new cloudwatch.Alarm(this, 'LambdaErrors', {
      metric: props.lambdaFunction.metricErrors({ period: cdk.Duration.minutes(5) }),
      threshold: 1,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      alarmDescription: 'SSR Lambda is returning errors',
    }).addAlarmAction(action);

    new cloudwatch.Alarm(this, 'LambdaSlow', {
      metric: props.lambdaFunction.metricDuration({
        period: cdk.Duration.minutes(5),
        statistic: 'p99',
      }),
      threshold: 8000,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      alarmDescription: 'SSR Lambda P99 duration approaching 10s timeout',
    }).addAlarmAction(action);
  }
}
