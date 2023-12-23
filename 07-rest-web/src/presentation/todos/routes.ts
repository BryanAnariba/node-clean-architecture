import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  
  public static routes(): Router {
    const router: Router = Router();
    const todosController = new TodosController();
    
    router.get('', todosController.getTodos);
    
    return router;
  }
}