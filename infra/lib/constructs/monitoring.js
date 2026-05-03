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
exports.Monitoring = void 0;
const cdk = __importStar(require("aws-cdk-lib/core"));
const cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
const actions = __importStar(require("aws-cdk-lib/aws-cloudwatch-actions"));
const sns = __importStar(require("aws-cdk-lib/aws-sns"));
const subscriptions = __importStar(require("aws-cdk-lib/aws-sns-subscriptions"));
const constructs_1 = require("constructs");
class Monitoring extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const topic = new sns.Topic(this, 'AlertTopic', {
            displayName: 'Quiz Webapp Alerts',
        });
        topic.addSubscription(new subscriptions.EmailSubscription(props.alertEmail));
        const action = new actions.SnsAction(topic);
        new cloudwatch.Alarm(this, 'LambdaErrors', {
            metric: props.lambdaFunction.metricErrors({ period: cdk.Duration.minutes(5) }),
            threshold: 1,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
            alarmDescription: 'SSR Lambda is returning errors',
        }).addAlarmAction(action);
        new cloudwatch.Alarm(this, 'LambdaSlow', {
            metric: props.lambdaFunction.metricDuration({
                period: cdk.Duration.minutes(5),
                statistic: 'p99',
            }),
            threshold: 8000,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
            treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
            alarmDescription: 'SSR Lambda P99 duration approaching 10s timeout',
        }).addAlarmAction(action);
    }
}
exports.Monitoring = Monitoring;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXdDO0FBQ3hDLHVFQUF5RDtBQUN6RCw0RUFBOEQ7QUFDOUQseURBQTJDO0FBQzNDLGlGQUFtRTtBQUVuRSwyQ0FBdUM7QUFPdkMsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFDdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzlDLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDekMsTUFBTSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDOUUsU0FBUyxFQUFFLENBQUM7WUFDWixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxrQ0FBa0M7WUFDcEYsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWE7WUFDM0QsZ0JBQWdCLEVBQUUsZ0NBQWdDO1NBQ25ELENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDdkMsTUFBTSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO2dCQUMxQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDO1lBQ0YsU0FBUyxFQUFFLElBQUk7WUFDZixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0I7WUFDeEUsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWE7WUFDM0QsZ0JBQWdCLEVBQUUsaURBQWlEO1NBQ3BFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBL0JELGdDQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYi9jb3JlJztcbmltcG9ydCAqIGFzIGNsb3Vkd2F0Y2ggZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2gnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaC1hY3Rpb25zJztcbmltcG9ydCAqIGFzIHNucyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc25zJztcbmltcG9ydCAqIGFzIHN1YnNjcmlwdGlvbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNucy1zdWJzY3JpcHRpb25zJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vbml0b3JpbmdQcm9wcyB7XG4gIGxhbWJkYUZ1bmN0aW9uOiBsYW1iZGEuRnVuY3Rpb247XG4gIGFsZXJ0RW1haWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE1vbml0b3JpbmcgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTW9uaXRvcmluZ1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IHRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnQWxlcnRUb3BpYycsIHtcbiAgICAgIGRpc3BsYXlOYW1lOiAnUXVpeiBXZWJhcHAgQWxlcnRzJyxcbiAgICB9KTtcbiAgICB0b3BpYy5hZGRTdWJzY3JpcHRpb24obmV3IHN1YnNjcmlwdGlvbnMuRW1haWxTdWJzY3JpcHRpb24ocHJvcHMuYWxlcnRFbWFpbCkpO1xuICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBhY3Rpb25zLlNuc0FjdGlvbih0b3BpYyk7XG5cbiAgICBuZXcgY2xvdWR3YXRjaC5BbGFybSh0aGlzLCAnTGFtYmRhRXJyb3JzJywge1xuICAgICAgbWV0cmljOiBwcm9wcy5sYW1iZGFGdW5jdGlvbi5tZXRyaWNFcnJvcnMoeyBwZXJpb2Q6IGNkay5EdXJhdGlvbi5taW51dGVzKDUpIH0pLFxuICAgICAgdGhyZXNob2xkOiAxLFxuICAgICAgZXZhbHVhdGlvblBlcmlvZHM6IDEsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6IGNsb3Vkd2F0Y2guQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UT19USFJFU0hPTEQsXG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOiBjbG91ZHdhdGNoLlRyZWF0TWlzc2luZ0RhdGEuTk9UX0JSRUFDSElORyxcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246ICdTU1IgTGFtYmRhIGlzIHJldHVybmluZyBlcnJvcnMnLFxuICAgIH0pLmFkZEFsYXJtQWN0aW9uKGFjdGlvbik7XG5cbiAgICBuZXcgY2xvdWR3YXRjaC5BbGFybSh0aGlzLCAnTGFtYmRhU2xvdycsIHtcbiAgICAgIG1ldHJpYzogcHJvcHMubGFtYmRhRnVuY3Rpb24ubWV0cmljRHVyYXRpb24oe1xuICAgICAgICBwZXJpb2Q6IGNkay5EdXJhdGlvbi5taW51dGVzKDUpLFxuICAgICAgICBzdGF0aXN0aWM6ICdwOTknLFxuICAgICAgfSksXG4gICAgICB0aHJlc2hvbGQ6IDgwMDAsXG4gICAgICBldmFsdWF0aW9uUGVyaW9kczogMSxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjogY2xvdWR3YXRjaC5Db21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6IGNsb3Vkd2F0Y2guVHJlYXRNaXNzaW5nRGF0YS5OT1RfQlJFQUNISU5HLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogJ1NTUiBMYW1iZGEgUDk5IGR1cmF0aW9uIGFwcHJvYWNoaW5nIDEwcyB0aW1lb3V0JyxcbiAgICB9KS5hZGRBbGFybUFjdGlvbihhY3Rpb24pO1xuICB9XG59XG4iXX0=