// Import ... from '@aws-sdk' is a package that is part of the AWS SDK for JavaScript/TypeScript

// Import the BedrockRuntimeClient class from the '/client-bedrock-runtime' module, that is specifically designed for 
// interacting with the Bedrock runtime environment. Bedrock is a toolkit for developing, building, deploying, and managing
// cloud services. 
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime'; 

// Import the DynamoDB class from the '/client-dynamodb' module, that is specifically tailored for working with Amazon DynamoDB, 
// which is a fully managed NoSQL database service provided by AWS
import { DynamoDB } from '@aws-sdk/client-dynamodb';

// Import the DynamoDBDocument class from the '/lib-dynamodb' module, that will provide an abstraction layer over the DynamoDB 
// client, offering a simplified API for working with DynamoDB operations in a more JavaScript-native way. 
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';


// Create an awsConfig object that will be used to pass in credentials from my .env file to create a DynamoDB and Bedrock client
const awsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_KEY_VALUE || '',
  },
  region: process.env.AWS_API_REGION || '',
};

// Create a new DynamoDB client
export const db = DynamoDBDocument.from(new DynamoDB(awsConfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,
  },
});

// Create a new BedrockRuntime Client for interaction with the AWS Bedrock runtime environment
export const bedrock = new BedrockRuntimeClient({
  ...awsConfig,
  region: 'us-east-1',
});
