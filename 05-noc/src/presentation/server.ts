import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImpl } from "../infraestructure/repositories";
import { FileSystemDataSource, MongoLogDataSource } from "../infraestructure/datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLog } from "../domain/use-cases/email/send-email-logs";
import { LogLevelSeverity } from "../domain/entities";

// Instancias
const logRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
  // new MongoLogDataSource(),
);

const emailService =  new EmailService();

export class Server {

  public static async start(): Promise<void> {
    console.log('NodeJS Server started!');
    
    // You can have many proccess or cron jobs here, in this case there are three: the first is called each 5 seconds, the second each 2 seconds and the thrind each 3 seconds.
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url: string = 'https://google.com';
    //   new CheckService(
    //     () => console.log(url + ' :: is Ok!'),
    //     (error) => console.log(error),
    //     logRepository,
    //   ).execute(url);
    // });

    // Email
    // Correo Con multiples adjuntos
    // new SendEmailLog(emailService, fileSystemLogRepository).execute(['saariel115@gmail.com', 'bryananariba0@gmail.com']);

    const logs = await logRepository.getLogs(LogLevelSeverity.LOW);
    console.log(logs);
  }
}