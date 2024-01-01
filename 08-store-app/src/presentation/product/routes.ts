import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);
    
    router
      .get('', [AuthMiddleware.validateJwt], productController.getAll)
      .get('/:productId', [AuthMiddleware.validateJwt], productController.getOne)
      .post('', [AuthMiddleware.validateJwt], productController.create)
      .put('/:productId', [AuthMiddleware.validateJwt], productController.editOne)
      .delete('/:productId', [AuthMiddleware.validateJwt], productController.deleteOne);
      
    return router;
  }
}