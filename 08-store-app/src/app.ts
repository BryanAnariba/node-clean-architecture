import { envs } from './config/envs';
import { MongoConnection } from './data';
import { Server } from './presentation/Server';
import { AppRoutes } from './presentation/appRoutes';

(async () => {
  await main();
})()

async function main () {
  const server = new Server({ 
    PORT: envs.PORT, 
    PUBLIC_PATH: envs.PUBLIC_PATH, 
    routes: AppRoutes.routes, 
  });
  await MongoConnection.connectToDB({dbName: envs.MONGO_DBNAME, connectionUrl: envs.MONGO_URL});
  await server.start();
}