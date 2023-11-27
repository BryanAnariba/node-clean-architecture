import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('js-foundation/03-callbacks.ts', () => {

  const uid = 3;
  const uidExisted = 1;

  test('getUserById should returns "User not found with id"', (done) => {
    getUserById(uid, (err, user) => {
      expect(err).toBe(`User not found with id ${uid}`);
      expect(user).toBe(undefined);

      // Para test asincronos ojo si no ejecuta primero el tes antes que se haga la peticion
      done();
    });
  });

  test('getUserById should returns John Doe', (done) => {
    getUserById(uidExisted, (err, user) => {
      expect(err).toBe(undefined);
      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
      });
      done();
    });
  });

});