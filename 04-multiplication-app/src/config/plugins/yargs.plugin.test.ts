const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const {yarg} = await import('./yargs.plugin');
  return yarg;
}

describe('Testing in yargs.plugin.test.ts', () => {
  const defaultArgV = process.argv;
  beforeEach(() => {
    process.argv = defaultArgV;
    jest.resetModules();
  });

  test('Should return default values.', async() => {
    const argv = await runCommand(['-b', '5']);
    //console.log(process.argv);
    console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'Mutiplication-Table',
        d: 'outputs'
      })
    );
  });

  test('Should return configuration with custom values', async () => {
    const argv = await runCommand(['-b', '10', '-l', '12', '-s', 'false', '-n', '10-multiplication-table', 'outputs']);
    //console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 12,
        s: false,
        n: '10-multiplication-table',
        d: 'outputs'
      })
    );
  });

});