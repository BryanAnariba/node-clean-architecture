import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface IRunOptions {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServerApp {

  public static run ({base, limit, show, name, destination}: IRunOptions) {
    console.log(`Node JS Server is runing!`);

    const table = new CreateTable().execute({base, limit});
    
    const wasFileCreated = new SaveFile().execute({filename: name, base: base, fileContent: table, destination: destination});
    
    if (show) console.log(table);
    
    (wasFileCreated) 
      ? console.log('Use Case Save File Success!')
      : console.error('Use Case Save File Failed!')
  }

}