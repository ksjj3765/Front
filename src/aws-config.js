import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || 'us-east-1_xxxxxxxxx',
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '1234567890abcdef'
};

export const userPool = new CognitoUserPool(poolData);
export const cognitoConfig = poolData;
