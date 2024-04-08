// Import the entire 'aws-cdk-lib' and store it as cdk. 'aws-cdk-lib' is the main library for AWS Cloud Development
import * as cdk from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
// Import Construct class from the 'constructs' module that represents a node in the CDK tree structure and is used to 
// define AWS resources or higher-level constructs
import { Construct } from 'constructs';

export class ChatRockIntfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new DynamoDB instance that is set to use on demand billing and to be removed when the stack is destroyed
    new Table(this, 'ChatRockDB', {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      tableName: 'ChatRockDB',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
