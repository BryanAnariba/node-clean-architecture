import { CronJob } from 'cron';
import { CronService } from "./cron/cron-service";

export class Server {

  public static start(): void {
    console.log('NodeJS Server started!');

    // You can have many proccess or cron jobs here, in this case there are three: the first is called each 5 seconds, the second each 2 seconds and the thrind each 3 seconds.
    CronService.createJob('*/5 * * * * *', () => {
      const date = new Date();
      console.log('Executed each 5 second', date);
    });

    CronService.createJob('*/2 * * * * *', () => {
      const date = new Date();
      console.log('Executed each 2 second', date);
    });

    CronService.createJob('*/3 * * * * *', () => {
      const date = new Date();
      console.log('Executed each 3 second', date);
    });
  }
}