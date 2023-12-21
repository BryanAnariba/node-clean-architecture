import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {

  public static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;
    try {
      const con = await mongoose.connect(mongoUrl, {dbName: dbName});
      // console.log(`MongoDB Connected at host: ${con.connection.host}`);
      return true;
    } catch (error) {
      // console.log('MongoConnection Error!');
      throw error;
    }
  }
}