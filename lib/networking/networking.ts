import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
//Construct that deploys 6 subnets 3 public subnets and 3 isolated subnets without a natgateway
export const networkingConstruct = (scope: cdk.Stack) => {

    const vpc = new ec2.Vpc(scope, 'base-vpc', {
        cidr: '10.0.0.0/16',
        natGateways: 0,
        maxAzs: 3,
        subnetConfiguration: [
            {
                name: 'public-subnet',
                subnetType: ec2.SubnetType.PUBLIC,
                cidrMask: 24
            },
            {
                name: 'isolated-subnet',
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 28
            }
        ]
    });

    return vpc
}