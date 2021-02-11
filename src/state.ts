import { init as initAws } from './lib/aws';
import { init as initSlack } from './lib/slack';

export const context = {
  sdk: {
    aws: initAws(),
    slack: initSlack(),
  },
};
