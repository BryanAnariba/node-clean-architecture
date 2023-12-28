import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/Server';

jest.mock('../src/presentation/Server');

describe('Testing in app.ts', () => {
  test('Should call server with arguments and start app', async () => {
    await import('../src/app');

    expect(Server).toHaveBeenCalledTimes(1);

    expect(Server).toHaveBeenCalledWith({
      PORT: envs.PORT,
      PUBLIC_PATH: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });
    
    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});