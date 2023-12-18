import fs from 'node:fs';
import { LogDataSource } from '../../domain/datasources';
import { LogEntity, LogLevelSeverity } from '../../domain/entities';

export class FileSystemDataSource implements LogDataSource {

  private readonly logPath        = 'logs/';
  private readonly allLogPaths    = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath   = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [ this.allLogPaths, this.mediumLogsPath, this.highLogsPath ]
    .forEach(path => {
      if(!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
    });
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    if (content === '') return [];
    const logs = content.split('\n').map(log => LogEntity.fromJson(log));
    return logs;
  }

  async saveLog(newlog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newlog)}\n`;
    // appendFileSync no lee todo el archivo, solo anexa una linea al final con el contenido
    fs.appendFileSync(this.allLogPaths, logAsJson);

    if (newlog.level === LogLevelSeverity.LOW) return;

    if (newlog.level === LogLevelSeverity.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    }
    if (newlog.level === LogLevelSeverity.HIGH) {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }
  
  async getLogs(logLevelSeverity: LogLevelSeverity): Promise<LogEntity[]> {
    switch (logLevelSeverity) {
      case LogLevelSeverity.LOW:
        return this.getLogsFromFile(this.allLogPaths);
      case LogLevelSeverity.MEDIUM:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogLevelSeverity.HIGH:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${logLevelSeverity} Not Implemented!`);
    }
  }

}
