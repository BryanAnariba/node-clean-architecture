import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
  await main();
})()

async function main () {
  // console.log({yarg});
  const { b: base, l: limit, s: show, n: name, d: destination } = yarg;
  ServerApp.run({base, limit, show, destination, name});
}

/*
  npx ts-node src/app.ts --base=3 --show=true --name=Multiplication-Table-3 --destination=outputs
*/