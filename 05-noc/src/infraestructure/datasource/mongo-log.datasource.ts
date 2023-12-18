import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources";
import { LogEntity, LogLevelSeverity } from "../../domain/entities";

export class MongoLogDataSource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
    console.log('Mongo Log Created: ' + newLog.id);
  }

  async getLogs(logLevelSeverity: LogLevelSeverity): Promise<LogEntity[]> {
    const logs = await LogModel.find({level: logLevelSeverity});
    return logs.map(log => MongoLogDataSource.fromObject(log));
  }

  static fromObject(object: {[key: string]: any}): LogEntity {
    const {message, level, origin} = object;
    const log = new LogEntity({message, level, origin});
    return log;
  }

}