import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {

  constructor (private readonly todoRepository: TodoRepository) {}

  public getTodos = async  (req: Request, res: Response): Promise<Response> => {
    //const { skip = 0, limit = 5 } = req.query;
    const todos = await this.todoRepository.getAll();
    return res.status(200).json(todos);
  }

  public getTodoById = async (req: Request, res: Response): Promise<Response> => {
    const { todoId } = req.params;

    const id =  Number(todoId);
    if (typeof id !== 'number') return res.status(400).json({error: `Todo with ${todoId} must be a number`});

    const todo = await this.todoRepository.findById(id);
    return (todo) ? res.status(200).json(todo) : res.status(204).json({error: `Todo with ${todoId} not found`});
  }

  public createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    const todo = await this.todoRepository.create(createTodoDto!);
    return res.status(201).json(todo);
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.todoId;  

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id: id });
    if (error) return res.status(400).json({error: error});
    console.log({updateTodoDto})
    const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
    
    return res.status(200).json(updateTodo);
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.todoId;
    const todo = await this.todoRepository.deleteById(id);
    return res.status(200).json(todo);
  }
}