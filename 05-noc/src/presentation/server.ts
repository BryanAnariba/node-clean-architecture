import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';

export class Server {

  public static start(): void {
    console.log('NodeJS Server started!');

    // You can have many proccess or cron jobs here, in this case there are three: the first is called each 5 seconds, the second each 2 seconds and the thrind each 3 seconds.
    CronService.createJob('*/5 * * * * *', () => {
      const url: string = 'http://localhost:3000';
      new CheckService(
        () => console.log(url + ' :: is Ok!'),
        (error) => console.log(error),
      ).execute(url);
    });
  }
}