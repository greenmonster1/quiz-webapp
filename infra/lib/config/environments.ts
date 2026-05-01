export interface EnvConfig {
  account?: string;
  region: string;
  domainName?: string;
  hostedZoneId?: string;
  lambdaMemoryMb: number;
  lambdaTimeoutSecs: number;
}

export const environments: Record<string, EnvConfig> = {
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
