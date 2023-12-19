import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources";
import { LogEntity, LogLevelSeverity } from "../../domain/entities";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  high: SeverityLevel.HIGH,
  medium: SeverityLevel.MEDIUM,
};

export class PostgresLogDatasource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.log.create({
      data: {
        message: log.message,
        origin: log.origin,
        level: level
      }
    });
    console.log('Log Created successfully!', newLog);
  }

  async getLogs(logLevelSeverity: LogLevelSeverity): Promise<LogEntity[]> {
    const level = severityEnum[logLevelSeverity];
    const logs = await prismaClient.log.findMany({
      where: {
        level: level
      }
    });
    return logs.map(log => LogEntity.fromJson(JSON.stringify(log)));
  }

}