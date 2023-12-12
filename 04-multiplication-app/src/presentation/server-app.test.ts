import { string } from 'yargs';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { IRunOptions, ServerApp } from './server-app';
describe('Testing in server-app.test.ts', () => {
  const options: IRunOptions = {
    base: 1,
    limit: 12,
    show: true,
    destination: 'test-destination',
    name: 'test-filename'
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return an instance of ServerApp', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  // test('Should run server app with options (Integration Test)', () => {

  //   const logSpy = jest.spyOn(console, 'log');
  //   const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
  //   const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

  //   ServerApp.run(options);
  //   expect(logSpy).toHaveBeenCalledTimes(3);
  //   expect(logSpy).toHaveBeenCalledWith(`Node JS Server is runing!`);
  //   expect(createTableSpy).toHaveBeenCalledTimes(1);
  //   expect(createTableSpy).toHaveBeenCalledWith({
  //     base: options.base, 
  //     limit: options.limit
  //   });
  //   expect(saveFileSpy).toHaveBeenCalledTimes(1);
  //   expect(saveFileSpy).toHaveBeenCalledWith({ 
  //     fileContent: expect.any(String),
  //     base: 1,
  //     destination: 'test-destination',
  //     filename: 'test-filename'});
  // });

  // El test comentado de arriba es mejor atomico asi como este
  test('Should run with custom values mocked!', () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue('1x1=1');
    const saveFileMock = jest.fn().mockReturnValue(true);

    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;
    global.console.log = logMock;
    global.console.error = logErrorMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Node JS Server is runing!');
    expect(createTableMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
    expect(saveFileMock).toHaveBeenCalledWith({
      base: 1,
      fileContent: '1x1=1',
      destination: 'test-destination',
      filename: 'test-filename'
    });
    expect(logMock).toHaveBeenCalledWith('Use Case Save File Success!');
    expect(logErrorMock).not.toHaveBeenCalled();
  });

});