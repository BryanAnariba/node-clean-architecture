import { buildLogger, logger } from '../../src/plugins/logger.plugin';

describe('plugins/logger.plugin.ts Test', () => {
  test('buildLogger should return a function logger', () => {
    const isLoggerFunction = buildLogger('test');
    expect(typeof isLoggerFunction.log).toBe('function');
    expect(typeof isLoggerFunction.error).toBe('function');
  });

  test('logger.log should return a message', () => {
    const winstonLoggerMock = jest.spyOn(logger, 'log');
    const message = 'Test Message';
    const service = 'Test Service';
    const myLogger = buildLogger(service);
    myLogger.log(message);
    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({ // que al menos contenga estos datos el json
        level: "info",
        message,
        service,
      })
    );
  });
});