import { ServerApp } from './presentation/server-app';

describe('starting testing of src/app.ts', () => {

  test('Should call server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv =['node', 'app.ts', '-b', '5', '-l', '12', '-s', 'false', '-n', '5-multiplication-table', 'outputs'];
    await import('./app');
    expect(serverRunMock).toHaveBeenLastCalledWith({
      base: 5,
      limit: 12,
      show: false,
      name: '5-multiplication-table',
      destination: 'outputs'
    })
  });

});