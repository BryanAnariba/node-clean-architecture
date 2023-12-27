import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl, TodoRepositoryImpl } from "../../infraestructure";

export class Routes {
  
  static get routes(): Router {
    
    const router: Router = Router();
    const todoDataSource = new TodoDataSourceImpl();
    const todosRepository = new TodoRepositoryImpl(todoDataSource);
    const todosController = new TodosController(todosRepository);
    
    router.get('', todosController.getTodos)
    router.get('/:todoId', todosController.getTodoById)
    router.post('', todosController.createTodo)
    router.put('/:todoId', todosController.updateTodo)
    router.delete('/:todoId', todosController.deleteTodo);
    
    return router;
  }
}