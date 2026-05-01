import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export interface SsrLambdaProps {
  distServerPath: string;
  memoryMb: number;
  timeoutSecs: number;
}

export class SsrLambda extends Construct {
  readonly lambdaFunction: lambda.Function;
  readonly functionUrl: lambda.FunctionUrl;
  readonly httpOrigin: origins.HttpOrigin;

  constructor(scope: Construct, id: string, props: SsrLambdaProps) {
    super(scope, id);

    // Use the AWS Lambda Web Adapter layer for zero-code HTTP passthrough
    // This allows the Express server.mjs to run as-is on Lambda
    const webAdapterLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'LwaLayer',
      // AWS public account 753240598075 hosts this layer in every region
      `arn:aws:lambda:${cdk.Stack.of(this).region}:753240598075:layer:LambdaAdapterLayerArm64:24`,
    );

    this.lambdaFunction = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.NODEJS_24_X,
      architecture: lambda.Architecture.ARM_64,
      handler: 'run.sh', // Lambda Web Adapter handler
      code: lambda.Code.fromAsset(props.distServerPath),
      memorySize: props.memoryMb,
      timeout: cdk.Duration.seconds(props.timeoutSecs),
      layers: [webAdapterLayer],
      environment: {
        NODE_ENV: 'production',
        PORT: '8080',
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/bootstrap',
      },
    });

    this.functionUrl = this.lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      // No CORS — CloudFront calls this server-to-server, not from browsers
    });

    this.httpOrigin = new origins.HttpOrigin(
      cdk.Fn.parseDomainName(this.functionUrl.url),
      {
        protocolPolicy:
          cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
      },
    );
  }
}
