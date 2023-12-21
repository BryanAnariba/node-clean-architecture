import { envs } from './envs.plugins';
describe('Starting envs.plugin.ts File Testing', () => {
  test('Should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'saariel115@gmail.com',
      MAILER_SECRET_KEY: 'ponerlakeycorrectaenprod',
      IS_PRODUCTION: false,
      MAILER_SERVICE: 'gmail',
      MONGO_URL: 'mongodb://bryansanchez:asd.456@localhost:27017/?authMechanism=DEFAULT',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'bryansanchez',
      MONGO_PASS: 'asd.456',
      POSTGRES_USER: 'bryansanchez',
      POSTGRES_DB: 'NOC_TEST',
      POSTGRES_PASSWORD: 'asd.456',
      POSTGRES_URL: 'postgresql://bryansanchez:asd.456@localhost:5432/NOC_TEST?schema=public',
      PGADMIN_DEFAULT_EMAIL: 'saariel115@gmail.com',
      PGADMIN_DEFAULT_PASSWORD: 'asd.456'
    });
  });

  test('Should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABD';

    try {
      await import('./envs.plugins');
      expect(true).toBe(false);
    } catch (error) {
      //console.log(error);
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});