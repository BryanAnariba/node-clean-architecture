import { Request, Response } from 'express';

let todos = [
  {id: 1, todoName: 'Buy Milk', completedAt: new Date()},
  {id: 2, todoName: 'Buy Bread', completedAt:  null},
  {id: 3, todoName: 'Buy Chocolate', completedAt: new Date()},
];

export class TodosController {
  constructor () {}

  public async getTodos (req: Request, res: Response): Promise<Response> {
    return res.status(200).json(todos);
  }

  public async getTodoById (req: Request, res: Response): Promise<Response> {
    const { todoId }= req.params;

    const id =  Number(todoId);
    if (typeof id !== 'number') return res.status(400).json({error: `Todo with ${todoId} must be a number`});

    const todo = todos.find(
      todo => todo.id === id
    );

    return (todo) ? res.status(200).json(todo) : res.status(204).json({error: `Todo with ${todoId} not found`});
  }

  public async createTodo (req: Request, res: Response): Promise<Response> {
    const {todoName, completedAt = new Date()} = req.body;
    if (!todoName || todoName.length === 0) return res.status(400).json({error: `Todo Name is required`});
    const todo = {id:  todos.length + 1, todoName: todoName, completedAt: completedAt};
    todos = [todo, ...todos];
    return res.status(201).json({"message": 'Todo Added Successfully: ' + JSON.stringify(todo)});
  }

  public async updateTodo (req: Request, res: Response): Promise<Response> {
    const id = +req.params.todoId;
    
    const { todoName, completedAt } = req.body;
    if (!todoName || todoName.length === 0) return res.status(400).json({error: `Todo Name is required`});
    
    const updateTodo = todos.find(todo => todo.id === id);
    if (!updateTodo) return res.status(404).json({error: `Todo with id ${id} not found`});

    updateTodo.todoName = todoName;
    (completedAt === 'null') ? updateTodo.completedAt = null : updateTodo.completedAt = new Date(completedAt || updateTodo.completedAt);

    todos.forEach((todo, index) => {
      if(todo.id === id) {
        todos[index] = updateTodo
      }
    });

    return res.status(200).json(updateTodo);
  }

  public async deleteTodo (req: Request, res: Response): Promise<Response> {
    const id = +req.params.todoId;
    const todoDeleted = todos.find(todo => todo.id === id);
    if (!todoDeleted) return res.status(400).json({erroor: `Todo with ${id} not found!`})
    todos = todos.filter(todo => todo.id !== id);
    return res.status(200).json(todoDeleted);
  }
}