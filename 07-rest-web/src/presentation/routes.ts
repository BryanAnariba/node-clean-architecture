import { Router } from "express";
import { Routes } from "./todos";

export class AppRoutes {

  static get routes(): Router {
    const router: Router = Router();

    router.use('/todos', Routes.routes);
    
    return router;
  }
}