import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins';

(async () => {
  main();
})();

async function main () {
  console.clear();
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  Server.start();
}