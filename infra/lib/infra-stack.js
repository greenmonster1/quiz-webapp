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
exports.QuizWebappStack = void 0;
const cdk = __importStar(require("aws-cdk-lib/core"));
const cloudfront = __importStar(require("aws-cdk-lib/aws-cloudfront"));
const path = __importStar(require("path"));
const static_assets_1 = require("./constructs/static-assets");
const ssr_lambda_1 = require("./constructs/ssr-lambda");
const monitoring_1 = require("./constructs/monitoring");
const quiz_table_1 = require("./constructs/quiz-table");
class QuizWebappStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { envConfig } = props;
        // Paths to Angular build output (relative to infra/lib directory)
        const distRoot = path.join(__dirname, '..', '..', 'dist', 'quiz-webapp');
        const distBrowserPath = path.join(distRoot, 'browser');
        const distServerPath = path.join(distRoot, 'server');
        // --- Static Assets (S3 + CloudFront Origin) ---
        const staticAssets = new static_assets_1.StaticAssets(this, 'StaticAssets', {
            distBrowserPath,
        });
        // --- SSR Lambda ---
        const ssrLambda = new ssr_lambda_1.SsrLambda(this, 'SsrLambda', {
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
        // --- DynamoDB (provisioned; not yet wired to frontend) ---
        const quizTable = new quiz_table_1.QuizTable(this, 'QuizTable');
        new cdk.CfnOutput(this, 'QuizTableName', {
            value: quizTable.table.tableName,
            description: 'DynamoDB table for quiz attempts',
        });
        // --- Monitoring ---
        new monitoring_1.Monitoring(this, 'Monitoring', {
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
exports.QuizWebappStack = QuizWebappStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBd0M7QUFDeEMsdUVBQXlEO0FBQ3pELDJDQUE2QjtBQUU3Qiw4REFBMEQ7QUFDMUQsd0RBQW9EO0FBQ3BELHdEQUFxRDtBQUNyRCx3REFBb0Q7QUFPcEQsTUFBYSxlQUFnQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzVDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBMkI7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUU1QixrRUFBa0U7UUFDbEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFckQsaURBQWlEO1FBQ2pELE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQVksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzFELGVBQWU7U0FDaEIsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLElBQUksc0JBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ2pELGNBQWM7WUFDZCxRQUFRLEVBQUUsU0FBUyxDQUFDLGNBQWM7WUFDbEMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxpQkFBaUI7U0FDekMsQ0FBQyxDQUFDO1FBRUgs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QUFDO0NBQ0Y7QUE3RkQsMENBNkZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliL2NvcmUnO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBTdGF0aWNBc3NldHMgfSBmcm9tICcuL2NvbnN0cnVjdHMvc3RhdGljLWFzc2V0cyc7XG5pbXBvcnQgeyBTc3JMYW1iZGEgfSBmcm9tICcuL2NvbnN0cnVjdHMvc3NyLWxhbWJkYSc7XG5pbXBvcnQgeyBNb25pdG9yaW5nIH0gZnJvbSAnLi9jb25zdHJ1Y3RzL21vbml0b3JpbmcnO1xuaW1wb3J0IHsgUXVpelRhYmxlIH0gZnJvbSAnLi9jb25zdHJ1Y3RzL3F1aXotdGFibGUnO1xuaW1wb3J0IHsgRW52Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvZW52aXJvbm1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWl6V2ViYXBwU3RhY2tQcm9wcyBleHRlbmRzIGNkay5TdGFja1Byb3BzIHtcbiAgZW52Q29uZmlnOiBFbnZDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBRdWl6V2ViYXBwU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogUXVpeldlYmFwcFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHsgZW52Q29uZmlnIH0gPSBwcm9wcztcblxuICAgIC8vIFBhdGhzIHRvIEFuZ3VsYXIgYnVpbGQgb3V0cHV0IChyZWxhdGl2ZSB0byBpbmZyYS9saWIgZGlyZWN0b3J5KVxuICAgIGNvbnN0IGRpc3RSb290ID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2Rpc3QnLCAncXVpei13ZWJhcHAnKTtcbiAgICBjb25zdCBkaXN0QnJvd3NlclBhdGggPSBwYXRoLmpvaW4oZGlzdFJvb3QsICdicm93c2VyJyk7XG4gICAgY29uc3QgZGlzdFNlcnZlclBhdGggPSBwYXRoLmpvaW4oZGlzdFJvb3QsICdzZXJ2ZXInKTtcblxuICAgIC8vIC0tLSBTdGF0aWMgQXNzZXRzIChTMyArIENsb3VkRnJvbnQgT3JpZ2luKSAtLS1cbiAgICBjb25zdCBzdGF0aWNBc3NldHMgPSBuZXcgU3RhdGljQXNzZXRzKHRoaXMsICdTdGF0aWNBc3NldHMnLCB7XG4gICAgICBkaXN0QnJvd3NlclBhdGgsXG4gICAgfSk7XG5cbiAgICAvLyAtLS0gU1NSIExhbWJkYSAtLS1cbiAgICBjb25zdCBzc3JMYW1iZGEgPSBuZXcgU3NyTGFtYmRhKHRoaXMsICdTc3JMYW1iZGEnLCB7XG4gICAgICBkaXN0U2VydmVyUGF0aCxcbiAgICAgIG1lbW9yeU1iOiBlbnZDb25maWcubGFtYmRhTWVtb3J5TWIsXG4gICAgICB0aW1lb3V0U2VjczogZW52Q29uZmlnLmxhbWJkYVRpbWVvdXRTZWNzLFxuICAgIH0pO1xuXG4gICAgLy8gLS0tIENsb3VkRnJvbnQgRGlzdHJpYnV0aW9uIC0tLVxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBjbG91ZGZyb250LkRpc3RyaWJ1dGlvbih0aGlzLCAnRGlzdHJpYnV0aW9uJywge1xuICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICAgIC8vIERlZmF1bHQ6IFNTUiB2aWEgTGFtYmRhIGZvciBkeW5hbWljIHJvdXRlc1xuICAgICAgICBvcmlnaW46IHNzckxhbWJkYS5odHRwT3JpZ2luLFxuICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgICAgICAgY2FjaGVQb2xpY3k6IGNsb3VkZnJvbnQuQ2FjaGVQb2xpY3kuQ0FDSElOR19ESVNBQkxFRCxcbiAgICAgICAgYWxsb3dlZE1ldGhvZHM6IGNsb3VkZnJvbnQuQWxsb3dlZE1ldGhvZHMuQUxMT1dfR0VUX0hFQUQsXG4gICAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGFkZGl0aW9uYWxCZWhhdmlvcnM6IHtcbiAgICAgICAgLy8gU3RhdGljIGFzc2V0cyBzZXJ2ZWQgZnJvbSBTMyB3aXRoIGxvbmcgY2FjaGUgVFRMXG4gICAgICAgICcvYXNzZXRzLyonOiB7XG4gICAgICAgICAgb3JpZ2luOiBzdGF0aWNBc3NldHMuczNPcmlnaW4sXG4gICAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IGNsb3VkZnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXG4gICAgICAgICAgY2FjaGVQb2xpY3k6IGNsb3VkZnJvbnQuQ2FjaGVQb2xpY3kuQ0FDSElOR19PUFRJTUlaRUQsXG4gICAgICAgICAgY29tcHJlc3M6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgICcvKi5qcyc6IHtcbiAgICAgICAgICBvcmlnaW46IHN0YXRpY0Fzc2V0cy5zM09yaWdpbixcbiAgICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgICAgICAgICBjYWNoZVBvbGljeTogY2xvdWRmcm9udC5DYWNoZVBvbGljeS5DQUNISU5HX09QVElNSVpFRCxcbiAgICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgJy8qLmNzcyc6IHtcbiAgICAgICAgICBvcmlnaW46IHN0YXRpY0Fzc2V0cy5zM09yaWdpbixcbiAgICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgICAgICAgICBjYWNoZVBvbGljeTogY2xvdWRmcm9udC5DYWNoZVBvbGljeS5DQUNISU5HX09QVElNSVpFRCxcbiAgICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgJy8qLmljbyc6IHtcbiAgICAgICAgICBvcmlnaW46IHN0YXRpY0Fzc2V0cy5zM09yaWdpbixcbiAgICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgICAgICAgICBjYWNoZVBvbGljeTogY2xvdWRmcm9udC5DYWNoZVBvbGljeS5DQUNISU5HX09QVElNSVpFRCxcbiAgICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgJy9pbmRleC5odG1sJzoge1xuICAgICAgICAgIC8vIFByZXJlbmRlcmVkIGhvbWUgcGFnZSBmcm9tIFMzIOKAlCB6ZXJvIExhbWJkYSBjb2xkIHN0YXJ0XG4gICAgICAgICAgb3JpZ2luOiBzdGF0aWNBc3NldHMuczNPcmlnaW4sXG4gICAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IGNsb3VkZnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXG4gICAgICAgICAgY2FjaGVQb2xpY3k6IGNsb3VkZnJvbnQuQ2FjaGVQb2xpY3kuQ0FDSElOR19PUFRJTUlaRUQsXG4gICAgICAgICAgY29tcHJlc3M6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gLS0tIER5bmFtb0RCIChwcm92aXNpb25lZDsgbm90IHlldCB3aXJlZCB0byBmcm9udGVuZCkgLS0tXG4gICAgY29uc3QgcXVpelRhYmxlID0gbmV3IFF1aXpUYWJsZSh0aGlzLCAnUXVpelRhYmxlJyk7XG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1F1aXpUYWJsZU5hbWUnLCB7XG4gICAgICB2YWx1ZTogcXVpelRhYmxlLnRhYmxlLnRhYmxlTmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRHluYW1vREIgdGFibGUgZm9yIHF1aXogYXR0ZW1wdHMnLFxuICAgIH0pO1xuXG4gICAgLy8gLS0tIE1vbml0b3JpbmcgLS0tXG4gICAgbmV3IE1vbml0b3JpbmcodGhpcywgJ01vbml0b3JpbmcnLCB7XG4gICAgICBsYW1iZGFGdW5jdGlvbjogc3NyTGFtYmRhLmxhbWJkYUZ1bmN0aW9uLFxuICAgICAgYWxlcnRFbWFpbDogJ3IubGFrc2htYW5AZ21haWwuY29tJyxcbiAgICB9KTtcblxuICAgIC8vIC0tLSBPdXRwdXRzIC0tLVxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdEaXN0cmlidXRpb25VcmwnLCB7XG4gICAgICB2YWx1ZTogYGh0dHBzOi8vJHtkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uRG9tYWluTmFtZX1gLFxuICAgICAgZGVzY3JpcHRpb246ICdDbG91ZEZyb250IGRpc3RyaWJ1dGlvbiBVUkwnLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0Rpc3RyaWJ1dGlvbklkJywge1xuICAgICAgdmFsdWU6IGRpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25JZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2xvdWRGcm9udCBkaXN0cmlidXRpb24gSUQgKGZvciBjYWNoZSBpbnZhbGlkYXRpb24pJyxcbiAgICB9KTtcbiAgfVxufVxuIl19