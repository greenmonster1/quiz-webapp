export interface EnvConfig {
    account?: string;
    region: string;
    domainName?: string;
    hostedZoneId?: string;
    lambdaMemoryMb: number;
    lambdaTimeoutSecs: number;
}
export declare const environments: Record<string, EnvConfig>;
