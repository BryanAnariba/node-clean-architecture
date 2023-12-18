import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogLevelSeverity } from "../../entities";
import { LogRepository } from "../../repositories";

interface SendEmailLogUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLog implements SendEmailLogUseCase {

  constructor (
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = await this.emailService.sendEmailWithFileSystemLog(to);
      if (!send) {
        throw new Error('Email Log not send');
      }
      const log = new LogEntity({message: 'Email Sended Successfully', level: LogLevelSeverity.LOW, origin: 'send-email-logs.ts'});
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({message: `${error}`, level: LogLevelSeverity.HIGH, origin: 'send-email-logs.ts'});
      this.logRepository.saveLog(log);
      return false;
    }
  }
}