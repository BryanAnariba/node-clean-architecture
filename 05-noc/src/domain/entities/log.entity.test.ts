import { LogEntity, LogLevelSeverity } from './log.entity';

describe('Testing in log.entity.ts file', () => {
  test('Should create a LogEntity Instance', () => {
    const log = new LogEntity({origin: 'log.datasource.ts', 'message': 'test-message', level: LogLevelSeverity.LOW});
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('test-message');
    expect(log.level).toBe(LogLevelSeverity.LOW);
    expect(log.origin).toBe('log.datasource.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('Should create a LogEntity fromJson', () => {
    const json = `{"message":"Service https://google.com is working","level":"low","createdAt":"2023-12-19T04:18:35.683Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com is working');
    expect(log.level).toBe(LogLevelSeverity.LOW);
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

});
