import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';
export interface SsrLambdaProps {
    distServerPath: string;
    memoryMb: number;
    timeoutSecs: number;
}
export declare class SsrLambda extends Construct {
    readonly lambdaFunction: lambda.Function;
    readonly functionUrl: lambda.FunctionUrl;
    readonly httpOrigin: origins.HttpOrigin;
    constructor(scope: Construct, id: string, props: SsrLambdaProps);
}
