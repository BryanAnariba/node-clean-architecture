import { Request ,Response } from "express";

export class AuthController {

  constructor () {}

  public login = (req: Request, res: Response) => {
    return res.status(200).json({data: 'Works!'})
  }

  public register = (req: Request, res: Response) => {
    return res.status(200).json({data: 'Works!'})
  }

  public validateEmail = (req: Request, res: Response) => {
    return res.status(200).json({data: 'Works!'})
  }
}