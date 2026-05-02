import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface QuizTableProps {
  envName: string;
}

export class QuizTable extends Construct {
  readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: QuizTableProps) {
    super(scope, id);

    const tableName = props.envName === 'prod' ? 'quiz-attempts' : `quiz-attempts-${props.envName}`;

    this.table = new dynamodb.Table(this, 'Table', {
      tableName,
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      // RETAIN so a cdk destroy never drops prod quiz history
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      timeToLiveAttribute: 'ttl',
      pointInTimeRecovery: true,
    });

    // GSI1: future leaderboard — query by LEADERBOARD PK, rank by score desc
    this.table.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'GSI1PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI1SK', type: dynamodb.AttributeType.STRING },
    });
  }
}
