import AWS from 'aws-sdk';
import { SSM_VERSION } from '../config/constants';

export const init = (): { ssm: AWS.SSM } => ({
  ssm: new AWS.SSM({ apiVersion: SSM_VERSION }),
});
