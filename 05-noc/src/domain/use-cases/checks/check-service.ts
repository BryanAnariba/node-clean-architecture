import { LogEntity, LogLevelSeverity } from "../../entities";
import { LogRepository } from "../../repositories";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  public fileName: string =  'check-service.ts';
  constructor (
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
    private readonly logRepository: LogRepository,
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if(!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({message: `Service ${url} is working`, level: LogLevelSeverity.LOW, origin: this.fileName});
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok :: ${error}`;
      const log = new LogEntity({message: errorMessage, level: LogLevelSeverity.HIGH, origin: this.fileName});
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}