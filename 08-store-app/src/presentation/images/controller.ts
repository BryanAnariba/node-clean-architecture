import fs from 'node:fs';
import path from 'node:path';
import { Request, Response } from "express";

export class ImageController {

  constructor () {}

  public getImage = (req: Request, res: Response) => {
    const {type='', img=''} = req.params;

    const imgPath = path.resolve(__dirname, `../../../uploads/${type}/${img}` );
    if (!fs.existsSync(imgPath)) {
      return res.status(404).json({error: 'img not found'});
    }

    res.sendFile(imgPath);
  }
}