import { Router } from "express";
import { ImageController } from './controller';

export class ImageRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const imageController = new ImageController();
    router.get('/:type/:img', imageController.getImage);

    return router;
  }
}