import { Router } from "express";
import { TodosController } from "./controller";

export class Routes {
  
  public static routes(): Router {
    const router: Router = Router();
    const todosController = new TodosController();
    
    router
      .get('', todosController.getTodos)
      .get('/:todoId', todosController.getTodoById)
      .post('', todosController.createTodo)
      .put('/:todoId', todosController.updateTodo)
      .delete('/:todoId', todosController.deleteTodo);
    
    return router;
  }
}