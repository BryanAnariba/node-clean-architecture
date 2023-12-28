import path from 'node:path';
import express, { Application, Router } from 'express';
import compression from 'compression';

interface Options {
  PORT: number;
  PUBLIC_PATH: string;
  routes: Router,
}

export class Server {
  public readonly app!: Application;
  private readonly PORT: number;
  private readonly PUBLIC_PATH: string;
  private readonly appRoutes: Router;
  private serverListener?: any;

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
    this.app.use(compression());

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
    this.serverListener = this.app.listen(this.PORT, () => {
      console.log(`NodeJS Server running on port ${this.PORT}`);
    });
  }

  public close() {
    this.serverListener.close();
  }
}