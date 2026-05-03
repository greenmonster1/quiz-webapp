import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
export interface MonitoringProps {
    lambdaFunction: lambda.Function;
    alertEmail: string;
}
export declare class Monitoring extends Construct {
    constructor(scope: Construct, id: string, props: MonitoringProps);
}
