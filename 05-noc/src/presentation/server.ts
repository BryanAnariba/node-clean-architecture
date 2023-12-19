import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImpl } from "../infraestructure/repositories";
import { FileSystemDataSource, MongoLogDataSource, PostgresLogDatasource } from "../infraestructure/datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLog } from "../domain/use-cases/email/send-email-logs";
import { LogLevelSeverity } from "../domain/entities";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// Instancias
const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource(),
);
const postgreLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);
const emailService =  new EmailService();

export class Server {

  public static async start(): Promise<void> {
    console.log('NodeJS Server started!');
    
    // Este job solo guarda en un datasource sea file system o mongo o postgre
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url: string = 'https://google.com';
    //   new CheckService(
    //     () => console.log(url + ' :: is Ok!'),
    //     (error) => console.log(error),
    //     postgreLogRepository,
    //   ).execute(url);
    // });


    // Este job guarda en las tres datasources o tres bases de datos, recibe un array de respositorios
    CronService.createJob('*/5 * * * * *', () => {
      const url: string = 'https://google.com';
      new CheckServiceMultiple(
        () => console.log(url + ' :: is Ok!'),
        (error) => console.log(error),
        [fsLogRepository, mongoLogRepository, postgreLogRepository]
      ).execute(url);
    });

    // Email
    // Correo Con multiples adjuntos
    // new SendEmailLog(emailService, fileSystemLogRepository).execute(['saariel115@gmail.com', 'bryananariba0@gmail.com']);

    // Mongo o Postgres o File System, esto es generico para los tres y reutilizable
    // const logs = await logRepository.getLogs(LogLevelSeverity.LOW);
    // console.log(logs);
  }
}