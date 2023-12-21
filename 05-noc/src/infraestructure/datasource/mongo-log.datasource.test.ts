import { MongoDataBase } from '../../data/mongo/init';
import { envs } from '../../config/plugins/envs.plugins';
import mongoose from 'mongoose';
import { MongoLogDataSource } from './mongo-log.datasource';
import { LogEntity, LogLevelSeverity } from '../../domain/entities';
import { LogModel } from '../../data/mongo';
describe('Testing mongo-log.datasource.ts file', () => {

  beforeAll(() => {
    MongoDataBase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async() => {  
    mongoose.connection.close();
  });

  const logDataSource = new MongoLogDataSource();
  const log = new LogEntity({
    level: LogLevelSeverity.MEDIUM,
    message: 'Test Mongo Log Data Source',
    origin: 'mongo-log.datasource.ts'
  });

  test('Should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await logDataSource.saveLog(log);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.any(String));
  });

  test('Should get logs', async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogLevelSeverity.MEDIUM);
    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogLevelSeverity.MEDIUM);
  });

});