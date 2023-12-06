import fs from 'node:fs';
import { IOptions, SaveFile } from './save-file.use-case';

describe('save-file.use-case.ts test', () => {

  afterEach(() => {
    // Borrar la carpeta de outputs
    const existOutputDirectory = fs.existsSync('outputs');
    if (existOutputDirectory) fs.rmSync('outputs', {recursive: true});

    // Borrar la carpeta de custom outputs
    const existCustomOutputDirectory = fs.existsSync('custom-outputs');
    if (existCustomOutputDirectory) fs.rmSync('custom-outputs', {recursive: true});
  });

  test('Should save value with default values' , () => {
    const saveFile = new SaveFile();
    const options: IOptions = {
      fileContent: 'test content',
      base: 2,
    };
    const result = saveFile.execute(options);
    expect(result).toBe(true);

    const filePath = `outputs/table-${options.base}/table.txt`;
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('Should save file with custom values', () => {
    const options: IOptions = {
      fileContent: 'custom content',
      filename: 'custom-table-name',
      base: 3,
      destination: 'custom-outputs'
    };
    const saveFile = new SaveFile();
    const result = saveFile.execute(options);
    expect(result).toBe(true);

    const filePath = 'custom-outputs/table-3/custom-table-name.txt';
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);

  });
});