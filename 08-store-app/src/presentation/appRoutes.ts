import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./product/routes";
import { FileUploadRoutes } from "./file-upload/routes";
import { ImageRoutes } from "./images/routes";

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();

    //* All routes of app here
    router.use('/auth', AuthRoutes.routes);
    router.use('/categories', CategoryRoutes.routes);
    router.use('/products', ProductRoutes.routes);
    router.use('/file-upload', FileUploadRoutes.routes);
    router.use('/images', ImageRoutes.routes);

    return router;
  }
}