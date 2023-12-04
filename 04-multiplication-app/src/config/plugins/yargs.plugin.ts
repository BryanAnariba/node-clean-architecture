import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .option('b', { // b es la base a multiplicar
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication Table Base',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplication Table Limit',    
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show table of multiplication in the terminal',
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'Mutiplication-Table',
    describe: 'Name of txt file',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Destination of txt file created',
  })
  .check((argv, options) => {
    // console.log({argv})
    if (argv.b < 1) throw 'Error: base must be greater than 0';
    return true;
  })
  .parseSync();