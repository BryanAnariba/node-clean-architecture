import path from "node:path";
import express, { Application, Router } from "express";

interface Options {
  PORT: number;
  PUBLIC_PATH: string;
  routes: Router;
}

export class Server {
  private readonly app!: Application;
  private readonly PORT: number;
  private readonly PUBLIC_PATH: string;
  private readonly appRoutes: Router;
  private serverListener?: any;

  constructor(options: Options) {
    this.app = express();
    this.PORT = options.PORT;
    this.PUBLIC_PATH = options.PUBLIC_PATH;
    this.appRoutes = options.routes;
  }

  async start (): Promise<void> {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    //* Routes
    this.app.use('/api', this.appRoutes);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
      res.send(indexPath);
    });

    //* Start Server
    this.serverListener = this.app.listen(this.PORT, () => {
      console.log(`Node JS Server started on port: ${this.PORT}`);
    });
  }

  close() {
    this.serverListener.close();
  }
}