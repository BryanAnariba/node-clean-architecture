import request from 'supertest';
import { TestServer } from '../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Testing in todo routes', () => {
  beforeAll(async () => {
    await TestServer.start();
  });

  afterAll(() => {
    TestServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todoOne = {todoName: 'Test todo one'};
  const todoTwo = {todoName: 'Test todo two'};

  test('Should return all todos from api/todos', async () => {
    await prisma.todo.createMany({
      data: [todoOne, todoTwo]
    });
    const {body} = await request(TestServer.app)
    .get('/api/todos')
    .expect(200);
    
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].todoName).toBe(todoOne.todoName);
  });

  test('Should return a todo api/todos/:id', async () => {
    const todo = await prisma.todo.create({data: todoOne});
    const {body} = await request(TestServer.app)
    .get(`/api/todos/${todo.id}`)
    .expect(200);
    expect(body).toEqual({
      id: todo.id,
      todoName: todo.todoName,
      completedAt: todo.completedAt,
    })
  });

  test('Should return a 404 NotFound api/todos/:id', async () => {
    const todoId = 9999;
    const { body } = await request(TestServer.app)
    .get(`/api/todos/${todoId}`)
    .expect(400);
    expect(body).toEqual({ error: `Todo with ${todoId} not found` });
  });

  test('Should return a new todo api/todos', async () => {
    const {body} = await request(TestServer.app)
    .post('/api/todos')
    .send(todoOne)
    .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      todoName: todoOne.todoName,
      completedAt: null
    });
    
  });

  test('Should return an error if text is "" creating a new todo api/todos', async () => {
    const {body} = await request(TestServer.app)
    .post('/api/todos')
    .send({todoName: ''})
    .expect(400);

    expect(body).toEqual( { error: 'Todo Name is required' });
  });

  test('Should return an error if text is not defined creating a new todo api/todos', async () => {
    const {body} = await request(TestServer.app)
    .post('/api/todos')
    .send({})    
    .expect(400);

    expect(body).toEqual( { error: 'Todo Name is required' });
  });
});
