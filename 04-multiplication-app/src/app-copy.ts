import { mkdirSync, writeFileSync } from 'node:fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit = 10, s: show} = yarg;

const num: number = base;
const outPath: string = 'outputs';
const generateTxtFile = (name: string, outPutData: string) => {
  mkdirSync(outPath, {recursive: true});
  writeFileSync(name, outPutData);
}

const mensaje: string = `=============================================================\n=================TABLA DE MULTIPLICAR DEL ${num}=================\n=============================================================\n`;
let outPutData: string = '';

for ( let i = 1; i <= limit; i ++ ) {
  if (outPutData.length !== 0) {
    outPutData += '\n';  
  }
  outPutData += num + 'x' + i + '=' + (num*i);
}

console.clear();
outPutData = mensaje + outPutData
generateTxtFile(`outputs/table-${num}.txt`, outPutData);
if (show) {
  console.log(outPutData);
}
console.log('File created!');
