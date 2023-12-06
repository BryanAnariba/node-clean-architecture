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
    let outPutData: string = '';
    for ( let i = 1; i <= limit; i ++ ) {
      outPutData += base + 'x' + i + '=' + (base*i);
      if (i<limit) outPutData += '\n';  
    }
    return outPutData;
  }
}