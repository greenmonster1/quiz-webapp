import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
export interface StaticAssetsProps {
    distBrowserPath: string;
}
export declare class StaticAssets extends Construct {
    readonly bucket: s3.Bucket;
    readonly s3Origin: cloudfront.IOrigin;
    constructor(scope: Construct, id: string, props: StaticAssetsProps);
}
