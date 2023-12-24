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
    this.app = express();
    this.PORT = options.PORT;
    this.PUBLIC_PATH = options.PUBLIC_PATH || 'public';
    this.appRoutes = options.routes;
  }

  async start (): Promise<void> {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    //* Static files
    this.app.use(express.static(this.PUBLIC_PATH));

    //* Routes
    this.app.use('/api',this.appRoutes);
    
    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
      res.sendFile(indexPath);
    });

    //* Start
    this.app.listen(this.PORT, () => {
      console.log(`NodeJS Server running on port ${this.PORT}`);
    });
  }
}