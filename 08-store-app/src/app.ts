import { envs } from './config/envs';
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
  await server.start();
}