import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';

//Construct that deploys our database instance and allows connections from the bastion instance
export const databaseConstruct = (scope: cdk.Stack, vpc: any, bastion: any) => {

    const rdsCluster = new rds.DatabaseInstance(scope, 'base-instance', {
        vpc,
        vpcSubnets: {
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        engine: rds.DatabaseInstanceEngine.postgres({
            version: rds.PostgresEngineVersion.VER_13_4
        }),
        instanceType: ec2.InstanceType.of(
            ec2.InstanceClass.BURSTABLE3,
            ec2.InstanceSize.MICRO
        ),
        credentials: rds.Credentials.fromGeneratedSecret('postgres'),
        multiAz: false,
        allocatedStorage: 100,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        databaseName: 'gestiondb',
        publiclyAccessible: false
    });

    rdsCluster.connections.allowFrom(bastion, ec2.Port.tcp(5432));

    return rdsCluster
}