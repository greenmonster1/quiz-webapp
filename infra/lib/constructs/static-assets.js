"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticAssets = void 0;
const cdk = __importStar(require("aws-cdk-lib/core"));
const s3 = __importStar(require("aws-cdk-lib/aws-s3"));
const s3deploy = __importStar(require("aws-cdk-lib/aws-s3-deployment"));
const origins = __importStar(require("aws-cdk-lib/aws-cloudfront-origins"));
const constructs_1 = require("constructs");
class StaticAssets extends constructs_1.Construct {
    bucket;
    s3Origin;
    constructor(scope, id, props) {
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
exports.StaticAssets = StaticAssets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWFzc2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXRpYy1hc3NldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXdDO0FBQ3hDLHVEQUF5QztBQUN6Qyx3RUFBMEQ7QUFFMUQsNEVBQThEO0FBQzlELDJDQUF1QztBQU12QyxNQUFhLFlBQWEsU0FBUSxzQkFBUztJQUNoQyxNQUFNLENBQVk7SUFDbEIsUUFBUSxDQUFxQjtJQUV0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXdCO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUMxQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUztZQUNqRCxVQUFVLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVU7WUFDMUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILGlGQUFpRjtRQUNqRixJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2xELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUM5QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsWUFBWSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDO2FBQ3hFO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsbUZBQW1GO1FBQ25GLGlGQUFpRjtRQUNqRiwyRkFBMkY7UUFDM0YsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3JELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUM5QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDZixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsWUFBWSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDO2FBQ3JEO1lBQ0QsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRjtBQXhDRCxvQ0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWIvY29yZSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnQnO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgKiBhcyBvcmlnaW5zIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljQXNzZXRzUHJvcHMge1xuICBkaXN0QnJvd3NlclBhdGg6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFN0YXRpY0Fzc2V0cyBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHJlYWRvbmx5IGJ1Y2tldDogczMuQnVja2V0O1xuICByZWFkb25seSBzM09yaWdpbjogY2xvdWRmcm9udC5JT3JpZ2luO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGF0aWNBc3NldHNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLmJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ0J1Y2tldCcsIHtcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXG4gICAgICBlbmNyeXB0aW9uOiBzMy5CdWNrZXRFbmNyeXB0aW9uLlMzX01BTkFHRUQsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IHRydWUsXG4gICAgfSk7XG5cbiAgICAvLyBIYXNoZWQgSlMvQ1NTL2Fzc2V0czogMS15ZWFyIGltbXV0YWJsZSBjYWNoZSAoZmlsZW5hbWUgY2hhbmdlcyBvbiBldmVyeSBidWlsZClcbiAgICBuZXcgczNkZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCAnRGVwbG95QXNzZXRzJywge1xuICAgICAgc291cmNlczogW3MzZGVwbG95LlNvdXJjZS5hc3NldChwcm9wcy5kaXN0QnJvd3NlclBhdGgpXSxcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiB0aGlzLmJ1Y2tldCxcbiAgICAgIGV4Y2x1ZGU6IFsnaW5kZXguaHRtbCddLFxuICAgICAgY2FjaGVDb250cm9sOiBbXG4gICAgICAgIHMzZGVwbG95LkNhY2hlQ29udHJvbC5mcm9tU3RyaW5nKCdwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZScpLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIC8vIGluZGV4Lmh0bWw6IG5vLWNhY2hlIHNvIENsb3VkRnJvbnQgYW5kIGJyb3dzZXJzIGFsd2F5cyBmZXRjaCB0aGUgbGF0ZXN0IHZlcnNpb24uXG4gICAgLy8gV2l0aG91dCB0aGlzLCBhIGRlcGxveSB0aGF0IHBydW5lcyBvbGQgaGFzaGVkIGJ1bmRsZXMgZnJvbSBTMyB3aGlsZSBDbG91ZEZyb250XG4gICAgLy8gc3RpbGwgc2VydmVzIHRoZSBjYWNoZWQgb2xkIGluZGV4Lmh0bWwgcmVmZXJlbmNpbmcgdGhvc2UgZGVsZXRlZCBmaWxlbmFtZXMg4oaSIGJsYW5rIHBhZ2UuXG4gICAgbmV3IHMzZGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgJ0RlcGxveUluZGV4SHRtbCcsIHtcbiAgICAgIHNvdXJjZXM6IFtzM2RlcGxveS5Tb3VyY2UuYXNzZXQocHJvcHMuZGlzdEJyb3dzZXJQYXRoKV0sXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogdGhpcy5idWNrZXQsXG4gICAgICBleGNsdWRlOiBbJyoqJ10sXG4gICAgICBpbmNsdWRlOiBbJ2luZGV4Lmh0bWwnXSxcbiAgICAgIGNhY2hlQ29udHJvbDogW1xuICAgICAgICBzM2RlcGxveS5DYWNoZUNvbnRyb2wuZnJvbVN0cmluZygncHVibGljLCBuby1jYWNoZScpLFxuICAgICAgXSxcbiAgICAgIHBydW5lOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuczNPcmlnaW4gPSBvcmlnaW5zLlMzQnVja2V0T3JpZ2luLndpdGhPcmlnaW5BY2Nlc3NDb250cm9sKHRoaXMuYnVja2V0KTtcbiAgfVxufVxuIl19