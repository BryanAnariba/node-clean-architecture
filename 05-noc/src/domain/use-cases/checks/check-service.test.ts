import { LogEntity } from '../../entities';
import { CheckService } from './check-service';
describe('Testing in check-service.ts file', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should call success callback when fetch returns true', async () => {
    const checkService = new CheckService(
      successCallback,
      errorCallback,
      mockRepository,
    );
    const wasOk = await checkService.execute('https://google.com');
    expect(wasOk).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test('Should call error callback when fetch returns false', async () => {
    const checkService = new CheckService(
      successCallback,
      errorCallback,
      mockRepository,
    );
    const wasOk = await checkService.execute('https://googleeeeee.com');
    expect(wasOk).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
