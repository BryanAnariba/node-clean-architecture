import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {

  public static checkType(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.params.type;

      if (!validTypes.includes(type)) {
        return res.status(400).json({error: `Invalid Type: ${type}, Valid Types ${validTypes}`});
      }
      next();
    }
  }
}