import { CreateTable } from './create-table.use-case';

describe('create-table.use-case.ts test', () => {

  test('Should create table with default values', () => {

    const createTable = new CreateTable();
    expect(createTable).toBeInstanceOf(CreateTable);
    const table = createTable.execute({base: 2});
    const rows = table.split('\n').length;
    expect(rows).toBe(10);

  });

  test('Should create a table with custom values', () => {

    const options = { base: 3, limit: 20 };
    const createTable = new CreateTable();
    const table = createTable.execute(options);
    expect(table.split('\n').length).toBe(options.limit);
    expect(table).toContain('3x1=3');
    expect(table).toContain('3x10=30');
    expect(table).toContain('3x20=60');

  });
  
});