import { getUUID } from '../../src/plugins/get-id.plugin';

describe('plugins/get-id.plugin.ts Test', () => {
  test('getUUID() should return and uuid value', () => {
    const uuid = getUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBeGreaterThanOrEqual(36);
  });
});