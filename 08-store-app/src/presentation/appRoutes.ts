import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();

    //* All routes of app here
    router.use('/auth', AuthRoutes.routes);

    return router;
  }
}