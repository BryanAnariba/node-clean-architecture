import { Server } from "./presentation/Server"

(async () => {
  await main()
})()

async function main () {
  const server = new Server();
  await server.start();
}