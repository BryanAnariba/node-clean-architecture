import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {
  constructor () {}

  public async getTodos (req: Request, res: Response): Promise<Response> {
    const { skip = 0, limit = 5 } = req.query;
    const todos = await prisma.todo.findMany({
      skip: Number(skip),
      take: Number(limit),
      orderBy: {
        completedAt: 'desc'
      },
    })
    return res.status(200).json(todos);
  }

  public async getTodoById (req: Request, res: Response): Promise<Response> {
    const { todoId }= req.params;
    const id =  Number(todoId);
    if (typeof id !== 'number') return res.status(400).json({error: `Todo with ${todoId} must be a number`});

    const todo = await prisma.todo.findUnique({where: {
      id: id
    }});
    return (todo) ? res.status(200).json(todo) : res.status(204).json({error: `Todo with ${todoId} not found`});
  }

  public async createTodo (req: Request, res: Response): Promise<Response> {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    const todo = await prisma.todo.create({data: createTodoDto!});
    return res.status(201).json(todo);
  }

  public async updateTodo (req: Request, res: Response): Promise<Response> {
    const id = +req.params.todoId;  

    const todo = await prisma.todo.findUnique({where: {id: id}});
    if (!todo) return res.status(400).json({error: `Todo with ${id} not found!`})  

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id: id });
    if (error) return res.status(400).json({error: error});

    const updateTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto?.id,
      },
      data: updateTodoDto!.values
    });
    
    return res.status(200).json(updateTodo);
  }

  public async deleteTodo (req: Request, res: Response): Promise<Response> {
    const id = +req.params.todoId;
    const todo = await prisma.todo.findUnique({where: {id: id}});
    if (!todo) return res.status(400).json({error: `Todo with ${id} not found!`})
    const todoDeleted = await prisma.todo.delete({where: {id: id}});
    return res.status(200).json(todoDeleted);
  }
}