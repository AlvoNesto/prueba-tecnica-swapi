import { DynamoDB } from 'aws-sdk';

export const dynamoDbConfig = {
  region: 'us-east-1',
};

export const dynamoDb = new DynamoDB.DocumentClient(dynamoDbConfig);
