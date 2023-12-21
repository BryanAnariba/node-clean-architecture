import mongoose from 'mongoose';
import { MongoDataBase } from '../init';
import { LogModel } from './log.model';
describe('Testing of log.model.ts', () => {

  beforeAll(async () => {
    await MongoDataBase.connect({
      dbName: `${process.env.MONGO_DB_NAME}`,
      mongoUrl: `${process.env.MONGO_URL}`
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('Should return log model', async () => {
    const logData = {
      message: 'log.model.ts test data',
      level: 'low',
      origin: 'log.model.test.ts'
    };

    const newLog = await LogModel.create(logData);
    //console.log(newLog);
    expect(newLog).toEqual(expect.objectContaining({
      ...logData,
      createdAt: expect.any(String),
      id: expect.any(String),
    }));

    await LogModel.findByIdAndDelete(newLog.id);
  });

  test('Should return a Schema object', () => {
    const schema = LogModel.schema.obj;
    //console.log(schema);
    expect(schema).toEqual(
      expect.objectContaining({
        message: {
          type: expect.any(Function),
          required: [ true, 'Message is required' ]
        },
        level: {
          type:  expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          required: [ true, 'Level is required' ],
          default: 'low'
        },
        origin: {
          type:  expect.any(Function),
          required: [ true, 'Origin is required' ]
        },
        createdAt: {
          type:  expect.any(Function),
          required: [ true, 'Created At is required' ],
          default: expect.any(Object),
        }
      })
    )
  });

});