import { LogEntity, LogLevelSeverity } from "../entities";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(logLevelSeverity: LogLevelSeverity): Promise<LogEntity[]>;
}