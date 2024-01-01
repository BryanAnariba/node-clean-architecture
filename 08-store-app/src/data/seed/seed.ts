import { MongoConnection } from "../mongo/init";
import { envs } from '../../config/envs';
import { CategoryModel, ProductModel, UserModel } from "../mongo/models";
import { seedData } from "./data";

(async () => {
  await MongoConnection.connectToDB({dbName: envs.MONGO_DBNAME, connectionUrl: envs.MONGO_URL});
  await main();
  await MongoConnection.disconnect();
})()

function randomBetween0ToX (x: number) {
  return Math.floor(Math.random() * x);
}

async function main () {
  // 0. Delete all
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  // 1. create users
  const users = await UserModel.insertMany(seedData.users);

  // 2. create categories
  const categories = await CategoryModel.insertMany(
    seedData.categories.map(
      cat => {
        return {
          ...cat, 
          user: users[0]._id
        }  
      }
    )
  )

  // 3. create products
  const products = await ProductModel.insertMany(
    seedData.products.map(
      product => {
        return {
          ...product,
          user: users[randomBetween0ToX(seedData.users.length-1)]._id,
          category: categories[randomBetween0ToX(seedData.categories.length-1)]._id,
        }
      }
    )
  )

 console.log('SEEDED!');
}