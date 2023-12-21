import { LogEntity, LogLevelSeverity } from '../../domain/entities';
import { LogRepositoryImpl } from './log.repository.impl';

describe('log.repository.imp.ts', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const logRepository = new LogRepositoryImpl(mockLogDataSource);
  
  test('saveLog should call to datasource with arguments', async () => {
    const log = {level: 'high', message: 'hola', origin: 'log.repository.impl.test.ts'} as LogEntity;
    await logRepository.saveLog(log);
    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });

  test('getLogs should call to datasource with arguments', async () => {
    await logRepository.getLogs(LogLevelSeverity.LOW);
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogLevelSeverity.LOW);
  });
});