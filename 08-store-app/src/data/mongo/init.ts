import mongoose from "mongoose";

export interface DBConnectionOptions {
  dbName: string;
  connectionUrl: string;
}

export class MongoConnection {
  public static async connectToDB(options: DBConnectionOptions) {
    const { dbName, connectionUrl } = options;
    try {
      const conn = await mongoose.connect(
        connectionUrl, {
        dbName: dbName
      });
      console.log(`MongoDB Started on port: ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.log(`Mongo Connection Error!`);
      throw error;
    }
  }
}