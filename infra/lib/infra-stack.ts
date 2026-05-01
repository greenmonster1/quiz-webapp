import * as cdk from 'aws-cdk-lib/core';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as path from 'path';
import { Construct } from 'constructs';
import { StaticAssets } from './constructs/static-assets';
import { SsrLambda } from './constructs/ssr-lambda';
import { Monitoring } from './constructs/monitoring';
import { EnvConfig } from './config/environments';

export interface QuizWebappStackProps extends cdk.StackProps {
  envConfig: EnvConfig;
}

export class QuizWebappStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: QuizWebappStackProps) {
    super(scope, id, props);

    const { envConfig } = props;

    // Paths to Angular build output (relative to infra/lib directory)
    const distRoot = path.join(__dirname, '..', '..', 'dist', 'quiz-webapp');
    const distBrowserPath = path.join(distRoot, 'browser');
    const distServerPath = path.join(distRoot, 'server');

    // --- Static Assets (S3 + CloudFront Origin) ---
    const staticAssets = new StaticAssets(this, 'StaticAssets', {
      distBrowserPath,
    });

    // --- SSR Lambda ---
    const ssrLambda = new SsrLambda(this, 'SsrLambda', {
      distServerPath,
      memoryMb: envConfig.lambdaMemoryMb,
      timeoutSecs: envConfig.lambdaTimeoutSecs,
    });

    // --- CloudFront Distribution ---
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        // Default: SSR via Lambda for dynamic routes
        origin: ssrLambda.httpOrigin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
      },
      additionalBehaviors: {
        // Static assets served from S3 with long cache TTL
        '/assets/*': {
          origin: staticAssets.s3Origin,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
        '/*.js': {
          origin: staticAssets.s3Origin,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
        '/*.css': {
          origin: staticAssets.s3Origin,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
        '/*.ico': {
          origin: staticAssets.s3Origin,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
        '/index.html': {
          // Prerendered home page from S3 — zero Lambda cold start
          origin: staticAssets.s3Origin,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
      },
    });

    // --- Monitoring ---
    new Monitoring(this, 'Monitoring', {
      lambdaFunction: ssrLambda.lambdaFunction,
      alertEmail: 'r.lakshman@gmail.com',
    });

    // --- Outputs ---
    new cdk.CfnOutput(this, 'DistributionUrl', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'CloudFront distribution URL',
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID (for cache invalidation)',
    });
  }
}
