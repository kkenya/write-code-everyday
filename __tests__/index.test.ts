import assert from 'assert';
import { handler } from '../src';

describe('lambda function', () => {
  describe('hander', () => {
    test('正しく終了すること', () => {
      handler();
      assert(true);
    });
  });
});
