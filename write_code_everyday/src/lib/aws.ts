import AWS from 'aws-sdk';
import { SSM_VERSION } from '../config/constants';

export const aws = {
  ssm: new AWS.SSM({ apiVersion: SSM_VERSION }),
};
