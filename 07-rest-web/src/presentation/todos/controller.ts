import { Request, Response } from 'express';

export class TodosController {
  constructor () {}

  public async getTodos (req: Request, res: Response): Promise<Response> {
    return res.json([
      {id: 1, todoName: 'Buy Milk', createdAt: new Date()},
      {id: 2, todoName: 'Buy Bread', createdAt: new Date()},
      {id: 3, todoName: 'Buy Chocolate', createdAt: new Date()},
    ]);
  }
}