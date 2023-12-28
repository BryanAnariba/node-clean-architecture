import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';

export class TodosController {

  constructor (private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    //const { skip = 0, limit = 5 } = req.query;
    new GetTodos(this.todoRepository)
    .execute()
    .then(todos => {
      return res.status(200).json(todos);
    })
    .catch((error) => res.status(400).json({error: error.message}));
  }

  public getTodoById = (req: Request, res: Response) => {
    const { todoId } = req.params;
    const id =  Number(todoId);
    if (typeof id !== 'number') return res.status(400).json({error: `Todo with ${todoId} must be a number`});

    new GetTodo(this.todoRepository)
    .execute(id)
    .then((todo) => {
      return res.status(200).json(todo);
    })
    .catch((error) => res.status(400).json({error: error.message}));
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    new CreateTodo(this.todoRepository)
    .execute(createTodoDto!)
    .then((todo) => {
      return res.status(201).json(todo);
    })
    .catch((error) => res.status(400).json(error.message));
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.todoId;  

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id: id });
    if (error) return res.status(400).json({error: error});
    
    new UpdateTodo(this.todoRepository)
    .execute(updateTodoDto!)
    .then((todo) => {
      return res.status(200).json(todo);
    })
    .catch((error) => res.status(400).json(error.message));
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.todoId;
    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then((todo) => {
      return res.status(200).json(todo);
    })
    .catch((error) => res.status(400).json(error.message));
  }
}