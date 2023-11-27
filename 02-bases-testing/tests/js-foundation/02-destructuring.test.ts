import { characters } from '../../src/js-foundation/02-destructuring';
describe('js-foundation/02-destructuring.ts', () => {
  test('characters should contain Flash and Superman', () => {
    expect(characters).toContain('Flash');
    expect(characters).toContain('Superman');
  });

  test('First Character should be Flash and Second Superman', () => {
    const [isFlash, isSuperman] = characters;
    expect(isFlash).toBe('Flash');
    expect(isSuperman).toBe('Superman');
  });
});