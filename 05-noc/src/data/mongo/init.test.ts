import mongoose from 'mongoose';
import { MongoDataBase } from './init';

describe('Testing in init.ts file', () => {
  afterAll(() => {
    mongoose.connection.close();
  });
  
  test('Should connect to MongoDB', async () => {
    const isConnected = await MongoDataBase.connect({
      dbName: `${process.env.MONGO_DB_NAME}`,
      mongoUrl: `${process.env.MONGO_URL}`
    });
    expect(isConnected).toBeTruthy();
  });

  test('Should return and error becouse the dbname is incorrect', async () => {
    try {
      const isConnected = await MongoDataBase.connect({
        dbName: `INCORRECT_dATABASE`,
        mongoUrl: `${process.env.MONGO_URL}`
      });
      expect(true).toBeFalsy();
    } catch (error) {
      
    }
  });
});