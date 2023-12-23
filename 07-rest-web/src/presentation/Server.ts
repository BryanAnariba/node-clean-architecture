import path from 'node:path';
import express, { Application, Router } from 'express';

interface Options {
  PORT: number;
  PUBLIC_PATH: string;
  routes: Router,
}

export class Server {
  private app!: Application;
  private readonly PORT: number;
  private readonly PUBLIC_PATH: string;
  private readonly appRoutes: Router;

  constructor (options: Options) {
    this.PORT = options.PORT;
    this.PUBLIC_PATH = options.PUBLIC_PATH || 'public';
    this.appRoutes = options.routes;
    this.app = express();
    this.staticFiles();
    this.routes();
  }

  middlewares(): void {

  }
  
  staticFiles(): void {
    this.app.use(express.static(this.PUBLIC_PATH));
  }

  routes(): void {
    this.app.use(this.appRoutes);
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
      res.sendFile(indexPath);
    });
  }

  async start (): Promise<void> {
    this.app.listen(this.PORT, () => {
      console.log(`NodeJS Server running on port ${this.PORT}`);
    });
  }
}