import path from 'node:path';
import express, { Application } from 'express';

export class Server {
  private app!: Application;

  constructor () {
    this.app = express();
    this.staticFiles();
    this.routes();
  }

  middlewares(): void {

  }

  staticFiles(): void {
    this.app.use(express.static('public'));
  }

  routes(): void {
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + '../../../public/index.html');
      res.sendFile(indexPath);
    });
  }

  async start (): Promise<void> {
    this.app.listen(3500, () => {
      console.log(`NodeJS Server running on port ${3500}`);
    });
  }
}