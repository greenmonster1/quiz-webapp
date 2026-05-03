import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { EnvConfig } from './config/environments';
export interface QuizWebappStackProps extends cdk.StackProps {
    envConfig: EnvConfig;
}
export declare class QuizWebappStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: QuizWebappStackProps);
}
