import { LogEntity, LogLevelSeverity } from '../entities';
import { LogDataSource } from './log.datasource';
describe('Testing in log.datasource.ts file', () => {
  const log = new LogEntity({origin: 'log.datasource.ts', 'message': 'test-message', level: LogLevelSeverity.LOW});

  class MockLogDataSource implements LogDataSource{
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(logLevelSeverity: LogLevelSeverity): Promise<LogEntity[]> {
      return [log];
    }
  }

  test('Should test the abstract class', async () => {
    const mockLogDataSource= new MockLogDataSource();
    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
    expect(mockLogDataSource).toHaveProperty('saveLog');
    expect(mockLogDataSource).toHaveProperty('getLogs');

    await mockLogDataSource.saveLog(log);
    const logs = await mockLogDataSource.getLogs(LogLevelSeverity.HIGH);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
