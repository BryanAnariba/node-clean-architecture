import { buildLogger, logger } from '../../src/plugins/logger.plugin';

describe('plugins/logger.plugin.ts Test', () => {
  test('buildLogger return function', () => {
    const log = buildLogger('test');
    expect(typeof log.log).toBe('function');
    expect(typeof log.error).toBe('function');
  });

  test('logger should a log message', () => {
    const winstonLoggerMock = jest.spyOn(logger, 'log');
    const message = 'test message';
    const service = 'test service';
    const logs = buildLogger(service);
    logs.log(message);
    expect(winstonLoggerMock).toHaveBeenCalledWith();
  });
});