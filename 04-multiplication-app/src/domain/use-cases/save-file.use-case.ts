import fs from 'node:fs';

export interface ISaveFileUseCase {
  execute: (options: IOptions) => boolean
}

export interface IOptions {
  fileContent: string;
  destination?: string;
  filename?: string;
  base: number;
}

export class SaveFile implements ISaveFileUseCase {
  constructor (
    // DI
  ) {}

  execute ({filename = 'table', base, fileContent, destination = 'outputs'}: IOptions): boolean {
    try {
      // if (!fs.existsSync('outputs')) {
      //   fs.mkdirSync(`outputs`, {recursive: true});  
      // }
      fs.mkdirSync(`${destination}/table-${base}`, {recursive: true});
      fs.writeFileSync(`${destination}/table-${base}/${filename}.txt`, fileContent);
      return true;
    } catch (err) {
      // console.error(err);
      return false;
    }
  }
}