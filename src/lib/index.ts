import { init as initAws } from './aws';
import { init as initSlack } from './slack';

export const sdk = {
  aws: initAws(),
  slack: initSlack(),
};
