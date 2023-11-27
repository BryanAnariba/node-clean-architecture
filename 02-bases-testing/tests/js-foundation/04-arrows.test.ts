import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('js-foundation/04-arrows.ts Test', () => {

  const uid: number = 30;
  const existUid: number = 1;

  test('getUserById should return User not found with id 30', (done) => {
    getUserById(uid, (err, user) => {
      expect(err).toBe(`User not found with id ${uid}`);
      expect(user).toBe(undefined);
      done();
    });
  });

  test('getUserById should returns 1 and John Doe', (done) => {
    getUserById(existUid, (err, user) => {
      expect(err).toBe(undefined);
      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
      });
      done();
    });
  });

});