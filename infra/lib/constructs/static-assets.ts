import * as cdk from 'aws-cdk-lib/core';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export interface StaticAssetsProps {
  distBrowserPath: string;
}

export class StaticAssets extends Construct {
  readonly bucket: s3.Bucket;
  readonly s3Origin: cloudfront.IOrigin;

  constructor(scope: Construct, id: string, props: StaticAssetsProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'Bucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Hashed JS/CSS/assets: 1-year immutable cache (filename changes on every build)
    new s3deploy.BucketDeployment(this, 'DeployAssets', {
      sources: [s3deploy.Source.asset(props.distBrowserPath)],
      destinationBucket: this.bucket,
      exclude: ['index.html'],
      cacheControl: [
        s3deploy.CacheControl.fromString('public, max-age=31536000, immutable'),
      ],
    });

    // index.html: no-cache so CloudFront and browsers always fetch the latest version.
    // Without this, a deploy that prunes old hashed bundles from S3 while CloudFront
    // still serves the cached old index.html referencing those deleted filenames → blank page.
    new s3deploy.BucketDeployment(this, 'DeployIndexHtml', {
      sources: [s3deploy.Source.asset(props.distBrowserPath)],
      destinationBucket: this.bucket,
      exclude: ['**'],
      include: ['index.html'],
      cacheControl: [
        s3deploy.CacheControl.fromString('public, no-cache'),
      ],
      prune: false,
    });

    this.s3Origin = origins.S3BucketOrigin.withOriginAccessControl(this.bucket);
  }
}
