import { CreateTable } from './create-table.use-case';
describe('starting test of src/domain/use-cases/create-table.use-case.test.ts', () => {

  const createTable = new CreateTable();
  const options = {base: 7, limit: 20};

  test('createTable Should to be instance of Create Table & row cuantity to be equal limit', () => {

    expect(createTable).toBeInstanceOf(CreateTable);

  });

  test('table Should return (7x1=7, 7x2=14, 7x10=70)', () => {
    
    const table = createTable.execute(options);
    const rows = table.split('\n').length;
    expect(table).toContain('7x1=7');
    expect(table).toContain('7x2=14');
    expect(table).toContain('7x10=70');
    expect(table).toContain('7x20=140');
    expect(rows).toBe(options.limit);

  });

});