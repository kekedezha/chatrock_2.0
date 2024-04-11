#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ChatRockInfrastructureStack } from '../lib/chatrock-infrastructure-stack';

const app = new cdk.App();
new ChatRockInfrastructureStack(app, 'ChatRockIntfrastructureStack', {});
