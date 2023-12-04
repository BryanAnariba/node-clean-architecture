export interface  ICreateTableUseCase {
  execute: (options: ICreateTableOptions) => string;
}

export interface ICreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements ICreateTableUseCase{
  constructor (
    // DI -> Dependency Injection
  ) {}

  execute ({base, limit = 10}: ICreateTableOptions): string {
    const mensaje: string = `=============================================================\n=================TABLA DE MULTIPLICAR DEL ${base}=================\n=============================================================\n`;
    let outPutData: string = '';
    for ( let i = 1; i <= limit; i ++ ) {
      if (outPutData.length !== 0) {
        outPutData += '\n';  
      }
      outPutData += base + 'x' + i + '=' + (base*i);
    }
    outPutData = mensaje + outPutData
    return outPutData;
  }
}