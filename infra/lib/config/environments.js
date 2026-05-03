"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environments = void 0;
exports.environments = {
    dev: {
        account: process.env['CDK_DEFAULT_ACCOUNT'],
        region: 'us-east-2',
        lambdaMemoryMb: 256,
        lambdaTimeoutSecs: 10,
    },
    prod: {
        account: process.env['CDK_DEFAULT_ACCOUNT'],
        region: 'us-east-2',
        // Uncomment and fill in for custom domain:
        // domainName: 'www.quizapp.com',
        // hostedZoneId: 'ZXXXXXXXXXXXXX',
        lambdaMemoryMb: 512,
        lambdaTimeoutSecs: 10,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW52aXJvbm1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVNhLFFBQUEsWUFBWSxHQUE4QjtJQUNyRCxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzQyxNQUFNLEVBQUUsV0FBVztRQUNuQixjQUFjLEVBQUUsR0FBRztRQUNuQixpQkFBaUIsRUFBRSxFQUFFO0tBQ3RCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7UUFDM0MsTUFBTSxFQUFFLFdBQVc7UUFDbkIsMkNBQTJDO1FBQzNDLGlDQUFpQztRQUNqQyxrQ0FBa0M7UUFDbEMsY0FBYyxFQUFFLEdBQUc7UUFDbkIsaUJBQWlCLEVBQUUsRUFBRTtLQUN0QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEVudkNvbmZpZyB7XG4gIGFjY291bnQ/OiBzdHJpbmc7XG4gIHJlZ2lvbjogc3RyaW5nO1xuICBkb21haW5OYW1lPzogc3RyaW5nO1xuICBob3N0ZWRab25lSWQ/OiBzdHJpbmc7XG4gIGxhbWJkYU1lbW9yeU1iOiBudW1iZXI7XG4gIGxhbWJkYVRpbWVvdXRTZWNzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBlbnZpcm9ubWVudHM6IFJlY29yZDxzdHJpbmcsIEVudkNvbmZpZz4gPSB7XG4gIGRldjoge1xuICAgIGFjY291bnQ6IHByb2Nlc3MuZW52WydDREtfREVGQVVMVF9BQ0NPVU5UJ10sXG4gICAgcmVnaW9uOiAndXMtZWFzdC0yJyxcbiAgICBsYW1iZGFNZW1vcnlNYjogMjU2LFxuICAgIGxhbWJkYVRpbWVvdXRTZWNzOiAxMCxcbiAgfSxcbiAgcHJvZDoge1xuICAgIGFjY291bnQ6IHByb2Nlc3MuZW52WydDREtfREVGQVVMVF9BQ0NPVU5UJ10sXG4gICAgcmVnaW9uOiAndXMtZWFzdC0yJyxcbiAgICAvLyBVbmNvbW1lbnQgYW5kIGZpbGwgaW4gZm9yIGN1c3RvbSBkb21haW46XG4gICAgLy8gZG9tYWluTmFtZTogJ3d3dy5xdWl6YXBwLmNvbScsXG4gICAgLy8gaG9zdGVkWm9uZUlkOiAnWlhYWFhYWFhYWFhYWFgnLFxuICAgIGxhbWJkYU1lbW9yeU1iOiA1MTIsXG4gICAgbGFtYmRhVGltZW91dFNlY3M6IDEwLFxuICB9LFxufTtcbiJdfQ==