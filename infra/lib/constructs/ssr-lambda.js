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
exports.SsrLambda = void 0;
const cdk = __importStar(require("aws-cdk-lib/core"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const cloudfront = __importStar(require("aws-cdk-lib/aws-cloudfront"));
const origins = __importStar(require("aws-cdk-lib/aws-cloudfront-origins"));
const constructs_1 = require("constructs");
class SsrLambda extends constructs_1.Construct {
    lambdaFunction;
    functionUrl;
    httpOrigin;
    constructor(scope, id, props) {
        super(scope, id);
        // Use the AWS Lambda Web Adapter layer for zero-code HTTP passthrough
        // This allows the Express server.mjs to run as-is on Lambda
        const webAdapterLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'LwaLayer', 
        // AWS public account 753240598075 hosts this layer in every region
        `arn:aws:lambda:${cdk.Stack.of(this).region}:753240598075:layer:LambdaAdapterLayerArm64:24`);
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
        this.httpOrigin = new origins.HttpOrigin(cdk.Fn.parseDomainName(this.functionUrl.url), {
            protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
        });
    }
}
exports.SsrLambda = SsrLambda;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLWxhbWJkYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNzci1sYW1iZGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXdDO0FBQ3hDLCtEQUFpRDtBQUNqRCx1RUFBeUQ7QUFDekQsNEVBQThEO0FBQzlELDJDQUF1QztBQVF2QyxNQUFhLFNBQVUsU0FBUSxzQkFBUztJQUM3QixjQUFjLENBQWtCO0lBQ2hDLFdBQVcsQ0FBcUI7SUFDaEMsVUFBVSxDQUFxQjtJQUV4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXFCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsc0VBQXNFO1FBQ3RFLDREQUE0RDtRQUM1RCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUM3RCxJQUFJLEVBQ0osVUFBVTtRQUNWLG1FQUFtRTtRQUNuRSxrQkFBa0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxnREFBZ0QsQ0FDNUYsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDMUQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsNkJBQTZCO1lBQ2hELElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ2pELFVBQVUsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUMxQixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNoRCxNQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDekIsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixJQUFJLEVBQUUsTUFBTTtnQkFDWix1QkFBdUIsRUFBRSxnQkFBZ0I7YUFDMUM7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO1lBQ3BELFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSTtZQUN6QyxzRUFBc0U7U0FDdkUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQ3RDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQzVDO1lBQ0UsY0FBYyxFQUNaLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVO1NBQzdDLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTdDRCw4QkE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWIvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250JztcbmltcG9ydCAqIGFzIG9yaWdpbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnQtb3JpZ2lucyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGludGVyZmFjZSBTc3JMYW1iZGFQcm9wcyB7XG4gIGRpc3RTZXJ2ZXJQYXRoOiBzdHJpbmc7XG4gIG1lbW9yeU1iOiBudW1iZXI7XG4gIHRpbWVvdXRTZWNzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBTc3JMYW1iZGEgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICByZWFkb25seSBsYW1iZGFGdW5jdGlvbjogbGFtYmRhLkZ1bmN0aW9uO1xuICByZWFkb25seSBmdW5jdGlvblVybDogbGFtYmRhLkZ1bmN0aW9uVXJsO1xuICByZWFkb25seSBodHRwT3JpZ2luOiBvcmlnaW5zLkh0dHBPcmlnaW47XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFNzckxhbWJkYVByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIC8vIFVzZSB0aGUgQVdTIExhbWJkYSBXZWIgQWRhcHRlciBsYXllciBmb3IgemVyby1jb2RlIEhUVFAgcGFzc3Rocm91Z2hcbiAgICAvLyBUaGlzIGFsbG93cyB0aGUgRXhwcmVzcyBzZXJ2ZXIubWpzIHRvIHJ1biBhcy1pcyBvbiBMYW1iZGFcbiAgICBjb25zdCB3ZWJBZGFwdGVyTGF5ZXIgPSBsYW1iZGEuTGF5ZXJWZXJzaW9uLmZyb21MYXllclZlcnNpb25Bcm4oXG4gICAgICB0aGlzLFxuICAgICAgJ0x3YUxheWVyJyxcbiAgICAgIC8vIEFXUyBwdWJsaWMgYWNjb3VudCA3NTMyNDA1OTgwNzUgaG9zdHMgdGhpcyBsYXllciBpbiBldmVyeSByZWdpb25cbiAgICAgIGBhcm46YXdzOmxhbWJkYToke2Nkay5TdGFjay5vZih0aGlzKS5yZWdpb259Ojc1MzI0MDU5ODA3NTpsYXllcjpMYW1iZGFBZGFwdGVyTGF5ZXJBcm02NDoyNGAsXG4gICAgKTtcblxuICAgIHRoaXMubGFtYmRhRnVuY3Rpb24gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18yNF9YLFxuICAgICAgYXJjaGl0ZWN0dXJlOiBsYW1iZGEuQXJjaGl0ZWN0dXJlLkFSTV82NCxcbiAgICAgIGhhbmRsZXI6ICdydW4uc2gnLCAvLyBMYW1iZGEgV2ViIEFkYXB0ZXIgaGFuZGxlclxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHByb3BzLmRpc3RTZXJ2ZXJQYXRoKSxcbiAgICAgIG1lbW9yeVNpemU6IHByb3BzLm1lbW9yeU1iLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMocHJvcHMudGltZW91dFNlY3MpLFxuICAgICAgbGF5ZXJzOiBbd2ViQWRhcHRlckxheWVyXSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIE5PREVfRU5WOiAncHJvZHVjdGlvbicsXG4gICAgICAgIFBPUlQ6ICc4MDgwJyxcbiAgICAgICAgQVdTX0xBTUJEQV9FWEVDX1dSQVBQRVI6ICcvb3B0L2Jvb3RzdHJhcCcsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5mdW5jdGlvblVybCA9IHRoaXMubGFtYmRhRnVuY3Rpb24uYWRkRnVuY3Rpb25Vcmwoe1xuICAgICAgYXV0aFR5cGU6IGxhbWJkYS5GdW5jdGlvblVybEF1dGhUeXBlLk5PTkUsXG4gICAgICAvLyBObyBDT1JTIOKAlCBDbG91ZEZyb250IGNhbGxzIHRoaXMgc2VydmVyLXRvLXNlcnZlciwgbm90IGZyb20gYnJvd3NlcnNcbiAgICB9KTtcblxuICAgIHRoaXMuaHR0cE9yaWdpbiA9IG5ldyBvcmlnaW5zLkh0dHBPcmlnaW4oXG4gICAgICBjZGsuRm4ucGFyc2VEb21haW5OYW1lKHRoaXMuZnVuY3Rpb25VcmwudXJsKSxcbiAgICAgIHtcbiAgICAgICAgcHJvdG9jb2xQb2xpY3k6XG4gICAgICAgICAgY2xvdWRmcm9udC5PcmlnaW5Qcm90b2NvbFBvbGljeS5IVFRQU19PTkxZLFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iXX0=