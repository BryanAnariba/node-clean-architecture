import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const fileUploadService = new FileUploadService();
    const fileUploadController = new FileUploadController(fileUploadService);

    router
      .post(
        '/single/:type', 
        [FileUploadMiddleware.containFile, TypeMiddleware.checkType(['users', 'categories', 'products'])], 
        fileUploadController.uploadFile
      )
      .post(
        '/multiple/:type', 
        [FileUploadMiddleware.containFile, TypeMiddleware.checkType(['users', 'categories', 'products'])], 
        fileUploadController.uploadMultipleFiles
      );
    return router;
  }
}