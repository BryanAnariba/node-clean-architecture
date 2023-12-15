import { LogDataSource } from "../../domain/datasources";
import { LogEntity, LogLevelSeverity } from "../../domain/entities";
import { LogRepository } from "../../domain/repositories";

export class LogRepositoryImpl implements LogRepository {

  constructor(
    private readonly logDataSource: LogDataSource
  ) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }

  async getLogs(logLevelSeverity: LogLevelSeverity): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(logLevelSeverity);
  }

}