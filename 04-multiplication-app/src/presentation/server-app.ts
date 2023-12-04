import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface IRunOptions {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServerApp {

  public static run ({base, limit, show, name, destination}: IRunOptions) {
    // console.log({base, limit, show});

    const table = new CreateTable().execute({base, limit});
    
    const wasFileCreated = new SaveFile().execute({filename: name, base: base, fileContent: table, destination: destination});
    
    if (show) console.log(table);
    
    (wasFileCreated) 
      ? console.log('Use Case Save File Success!')
      : console.log('Use Case Save File Failed!')
  }

}