export enum LogLevelSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface LogEntityOptions {
  message: string;
  level: LogLevelSeverity;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {

  public level: LogLevelSeverity;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date()} = options;
    this.message = message;
    this.level = level;
    this.createdAt = new Date(createdAt);
    this.origin = origin;
  }

  public static fromJson = (jsonData: string): LogEntity => {
    jsonData = (jsonData === '') ? '{}': jsonData;
    const {message, level, createdAt, origin} = JSON.parse(jsonData);
    const log = new LogEntity({message, level, origin});
    log.createdAt = new Date(createdAt);
    return log;
  }
  
}