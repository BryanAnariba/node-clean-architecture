export enum LogLevelSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class LogEntity {

  public level: LogLevelSeverity;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogLevelSeverity) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  public static fromJson = (jsonData: string): LogEntity => {
    const {message, level, createdAt} = JSON.parse(jsonData);
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  }
  
}