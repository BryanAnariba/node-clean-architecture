import fs from 'node:fs';
import { IOptions, SaveFile } from './save-file.use-case';

describe('src/domain/use-case', () => {


  afterEach(() => {
    const existDirOne = fs.existsSync('outputs');
    const existDirTwo = fs.existsSync('custom-ouputs');
    if (existDirOne) fs.rmSync('outputs', {recursive: true});
    if (existDirTwo) fs.rmSync('custom-ouputs', {recursive: true});
  });
  
  
  test('Should save file with default values', () => {

    const saveFile = new SaveFile();
    const options: IOptions = { 
      base: 6, 
      fileContent: 'Testing Save File Use Case' ,
    };
    const filePath: string = `outputs/table-${options.base}/table.txt`;
    const isSaved = saveFile.execute({base: options.base, fileContent: options.fileContent});
    expect(isSaved).toBe(true);

    const checkFile = fs.existsSync(filePath);
    expect(checkFile).toBe(true);

    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
    expect(fileContent).toContain(options.fileContent);

  });

  test('Should Save file with custom values', () => {

    const options: IOptions = { 
      base: 2, 
      fileContent: 'Custom Testing Save File Use Case' ,
      destination: `custom-ouputs`,
      filename: `custom-table-name`,
    };

    const filePath: string = `${options.destination}/table-${options.base}/${options.filename}.txt`;

    const savedFile = new SaveFile();

    const isSaved = savedFile.execute(options);
    expect(isSaved).toBeTruthy();

    const checkFile = fs.existsSync(filePath);
    expect(checkFile).toBeTruthy();

    const fileCustomContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
    expect(fileCustomContent).toContain(options.fileContent);

  });

  test('Should return false if directory could not be created!', () => {

    const options: IOptions = { 
      base: 2, 
      fileContent: 'Custom Testing Save File Use Case' ,
      destination: `custom-ouputs`,
      filename: `custom-table-name`,
    };

    const saveFile = new SaveFile();

    // Simulamos que el directorio con el archivo se crearon, espiando el momento que se ejecuta mkdirSync
    const mkDirMockSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => {
        throw new Error(`Error: This is a custom error created by me in testing by CREATE FOLDER SYNC`);
      }
    );

    const result = saveFile.execute(options);
    expect(result).toBeFalsy();
    mkDirMockSpy.mockRestore();

  });

  test('Should return false if file of table was not created but the directory if write created!', () => {

    const saveFile = new SaveFile();
    const writeFileSyncSpyMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => {
        throw new Error(`Error: This is a custom error created by me in testing by WRITE FILE SYNC`);
      }
    );
    const result = saveFile.execute({fileContent: 'test message', base: 1});
    expect(result).toBeFalsy();
    writeFileSyncSpyMock.mockRestore();

  });

});