#!/usr/bin/env node
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
const cdk = __importStar(require("aws-cdk-lib/core"));
const infra_stack_1 = require("../lib/infra-stack");
const environments_1 = require("../lib/config/environments");
const app = new cdk.App();
const envName = app.node.tryGetContext('env') ?? 'dev';
const envConfig = environments_1.environments[envName];
if (!envConfig) {
    throw new Error(`Unknown environment: "${envName}". Available: ${Object.keys(environments_1.environments).join(', ')}`);
}
new infra_stack_1.QuizWebappStack(app, `QuizWebapp-${envName}`, {
    env: {
        account: envConfig.account ?? process.env['CDK_DEFAULT_ACCOUNT'],
        region: envConfig.region,
    },
    envConfig,
    tags: {
        project: 'quiz-app',
        Environment: envName,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBd0M7QUFDeEMsb0RBQXFEO0FBQ3JELDZEQUEwRDtBQUUxRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixNQUFNLE9BQU8sR0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQVksSUFBSSxLQUFLLENBQUM7QUFDbkUsTUFBTSxTQUFTLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV4QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDZixNQUFNLElBQUksS0FBSyxDQUNiLHlCQUF5QixPQUFPLGlCQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDeEYsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLDZCQUFlLENBQUMsR0FBRyxFQUFFLGNBQWMsT0FBTyxFQUFFLEVBQUU7SUFDaEQsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztRQUNoRSxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07S0FDekI7SUFDRCxTQUFTO0lBQ1QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLFVBQVU7UUFDbkIsV0FBVyxFQUFFLE9BQU87S0FDckI7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWIvY29yZSc7XG5pbXBvcnQgeyBRdWl6V2ViYXBwU3RhY2sgfSBmcm9tICcuLi9saWIvaW5mcmEtc3RhY2snO1xuaW1wb3J0IHsgZW52aXJvbm1lbnRzIH0gZnJvbSAnLi4vbGliL2NvbmZpZy9lbnZpcm9ubWVudHMnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5jb25zdCBlbnZOYW1lID0gKGFwcC5ub2RlLnRyeUdldENvbnRleHQoJ2VudicpIGFzIHN0cmluZykgPz8gJ2Rldic7XG5jb25zdCBlbnZDb25maWcgPSBlbnZpcm9ubWVudHNbZW52TmFtZV07XG5cbmlmICghZW52Q29uZmlnKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICBgVW5rbm93biBlbnZpcm9ubWVudDogXCIke2Vudk5hbWV9XCIuIEF2YWlsYWJsZTogJHtPYmplY3Qua2V5cyhlbnZpcm9ubWVudHMpLmpvaW4oJywgJyl9YCxcbiAgKTtcbn1cblxubmV3IFF1aXpXZWJhcHBTdGFjayhhcHAsIGBRdWl6V2ViYXBwLSR7ZW52TmFtZX1gLCB7XG4gIGVudjoge1xuICAgIGFjY291bnQ6IGVudkNvbmZpZy5hY2NvdW50ID8/IHByb2Nlc3MuZW52WydDREtfREVGQVVMVF9BQ0NPVU5UJ10sXG4gICAgcmVnaW9uOiBlbnZDb25maWcucmVnaW9uLFxuICB9LFxuICBlbnZDb25maWcsXG4gIHRhZ3M6IHtcbiAgICBwcm9qZWN0OiAncXVpei1hcHAnLFxuICAgIEVudmlyb25tZW50OiBlbnZOYW1lLFxuICB9LFxufSk7XG4iXX0=