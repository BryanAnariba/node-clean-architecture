import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  
  public static get routes(): Router {
    const router: Router = Router();

    const categoryService = new CategoryService();
    const categoryController = new CategoryController(categoryService);
    router
      .get('', [AuthMiddleware.validateJwt], categoryController.getAll)
      .get('/:categoryId', [AuthMiddleware.validateJwt], categoryController.getOne)
      .post('', [AuthMiddleware.validateJwt], categoryController.create)
      .put('/:categoryId', [AuthMiddleware.validateJwt], categoryController.deleteOne)
      .delete('/:categoryId', [AuthMiddleware.validateJwt], categoryController.deleteOne);
      
    return router;
  }
}