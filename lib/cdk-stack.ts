import * as cdk from '@aws-cdk/core';
import { Construct } from 'constructs';
import { networkingConstruct } from './networking/networking';
import { bastionConstruct } from './bastion/bastion';
import { databaseConstruct } from './database/database';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const vpc = networkingConstruct(this);

    const bastionEC2 = bastionConstruct(this, vpc);

    const rdsCluster = databaseConstruct(this, vpc, bastionEC2);

  }
}
