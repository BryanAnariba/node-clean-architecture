import fs from 'node:fs';
import path from 'node:path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogLevelSeverity } from '../../domain/entities';

describe('FileSystemDataSource Testing', () => {
  const logPath = path.join(__dirname, '../../../logs');
  beforeEach(() => {
    fs.rmSync(logPath, {recursive: true, force: true});
  });

  test('Should create log files if they do not exist', () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
  });

  test('Should save a log in a logs-all.log low', () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogLevelSeverity.LOW,
      message: 'Test Mongo Log Data Source',
      origin: 'file-system.datasource.ts'
    }); 
    logDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    //console.log(allLogs);
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('Should save a log in a logs-all.log medium', () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogLevelSeverity.MEDIUM,
      message: 'Test Mongo Log Data Source',
      origin: 'file-system.datasource.ts'
    }); 
    logDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test('Should save a log in a logs-all.log high', () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogLevelSeverity.HIGH,
      message: 'Test Mongo Log Data Source',
      origin: 'file-system.datasource.ts'
    }); 
    logDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('Should return all logs', async () => {
    const logDataSource = new FileSystemDataSource();
    const logLow = new LogEntity({
      level: LogLevelSeverity.LOW,
      message: 'Test Mongo Log Data Source',
      origin: 'file-system.datasource.ts'
    }); 
    const logMedium = new LogEntity({
      level: LogLevelSeverity.MEDIUM,
      message: 'Test Mongo Log Data Source',
      origin: 'file-system.datasource.ts'
    }); 
    const logHigh = new LogEntity({
      level: LogLevelSeverity.HIGH,
      message: 'Test Mongo Log Data Source',
      origin: 'file-system.datasource.ts'
    }); 
    await logDataSource.saveLog(logLow);
    await logDataSource.saveLog(logMedium);
    await logDataSource.saveLog(logHigh);

    const logsLow = await logDataSource.getLogs(LogLevelSeverity.LOW);
    const logsMedium = await logDataSource.getLogs(LogLevelSeverity.MEDIUM);
    const logsHigh = await logDataSource.getLogs(LogLevelSeverity.HIGH);

    //expect(logsLow).toEqual(expect.arrayContaining([logsLow, logsMedium, logsHigh]));
    // expect(logsLow).toEqual(expect.arrayContaining([logsLow, logsMedium, logsHigh]));
    // expect(logsLow).toEqual(expect.arrayContaining([logsLow, logsMedium, logsHigh]));
  });

});
