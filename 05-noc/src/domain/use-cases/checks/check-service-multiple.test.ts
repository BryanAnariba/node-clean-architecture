import { LogEntity } from "../../entities";
import { CheckServiceMultiple } from './check-service-multiple';

describe('Testing in check-service-multiple.ts file', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const successCallbackMock = jest.fn();
  const errorCallbackMock = jest.fn();
  const logRepositoryMock1 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const logRepositoryMock2 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const logRepositoryMock3 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const allMocksRepos =  [
    logRepositoryMock1,
    logRepositoryMock2,
    logRepositoryMock3,
  ];

  test('Should call success callback when fetch returns true', async () => {
    const checkService = new CheckServiceMultiple(
      successCallbackMock,
      errorCallbackMock,
      allMocksRepos
    );
    const wasOk = await checkService.execute('https://google.com');
    expect(wasOk).toBeTruthy();
    expect(successCallbackMock).toHaveBeenCalled();
    expect(errorCallbackMock).not.toHaveBeenCalled();
    allMocksRepos.forEach(repository => {
      expect(repository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    });
  });

  test('Should call error callback when fetch returns false', async () => {
    const checkService = new CheckServiceMultiple(
      successCallbackMock,
      errorCallbackMock,
      allMocksRepos
    );
    const wasOk = await checkService.execute('https://googleeeeee.com');
    expect(wasOk).toBeFalsy();
    expect(successCallbackMock).not.toHaveBeenCalled();
    expect(errorCallbackMock).toHaveBeenCalled();
    allMocksRepos.forEach(repository => {
      expect(repository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    });
  });
});