import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as conf from '../config.json';

//Construct used for creating that bastion instance which will enable outside access to our rds instance
export const bastionConstruct = (scope: cdk.Stack, vpc: any) => {

    const bastionInstanceSg = new ec2.SecurityGroup(scope, 'bastion-instance-sg', {
        vpc
    });

    bastionInstanceSg.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        'Allows SSH Conections'
    )

    const bastionInstance = new ec2.Instance(scope, 'bastion-instance', {
        vpc,
        vpcSubnets: {
            subnetType: ec2.SubnetType.PUBLIC
        },
        securityGroup: bastionInstanceSg,
        instanceType: ec2.InstanceType.of(
            ec2.InstanceClass.BURSTABLE2,
            ec2.InstanceSize.MICRO,
        ),
        machineImage: new ec2.AmazonLinuxImage({
            generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
        }),
        //We retrieve the pem key name from the config json file
        keyName: conf.BASTION.PEM_KEY_NAME
    })

    return bastionInstance
}