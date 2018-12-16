#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk')
import { BatchStack } from '../lib/batch-stack'

const app = new cdk.App()
new BatchStack(app, 'BatchStack')
app.run()
