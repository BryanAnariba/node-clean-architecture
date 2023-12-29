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

  // TODO: GET
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
    const {body} = await request(TestServer.app)
    .get(`/api/todos/${todoId}`)
    .expect(404);
    expect(body).toEqual({ error: `Todo with ${todoId} not found` });
  });

  // TODO: POST
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

  test('Should return an error if the date of completedAt is invalid api/todos', async () => {
    let todo = {todoName: 'Todo with incorrect date', completedAt: 'foo'};
    const {body} = await request(TestServer.app)
    .post('/api/todos')
    .send(todo)
    .expect(400);
    expect(body).toEqual({ error: 'Completed At must be a valid date' });
  });

  // TODO: PUT
  test('Should return an updated todo from api/todos/:id', async () => {
    const todo = await prisma.todo.create({data: todoOne});
    const {body} = await request(TestServer.app)
    .put(`/api/todos/${todo.id}`)
    .send({todoName: 'Todo Updated', completedAt: (new Date('2023-10-21')).toISOString()})
    .expect(200);
    expect(body).toEqual({
      id: expect.any(Number),
      todoName: 'Todo Updated',
      completedAt: '2023-10-21T00:00:00.000Z'
    });
  });

  test('Should return 404 if todo not found', async () => {
    const todo = await prisma.todo.create({data: todoOne});
    const {body} = await request(TestServer.app)
    .put(`/api/todos/${todo.id + 1}`)
    .send({todoName: 'Todo Updated', completedAt: (new Date('2023-10-21')).toISOString()})
    .expect(404);
    expect(body).toEqual({ error: `Todo with ${todo.id + 1} not found` });
  });

  test('Shoud return an updated TODO only the date', async () => {
    const todo = await prisma.todo.create({data: todoOne});
    // console.log('Todo created: ', todo);
    const {body} = await request(TestServer.app)
    .put(`/api/todos/${todo.id}`)
    .send({completedAt: (new Date('2023-10-21')).toISOString()})
    .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      todoName: todoOne.todoName,
      completedAt: '2023-10-21T00:00:00.000Z'
    })
    // console.log('Todo updated: ', body);
  });

  // TODO: Delete
  test('Should delete todo', async () => {
    const todo = await prisma.todo.create({data: todoOne});
    const {body} = await request(TestServer.app)
    .delete(`/api/todos/${todo.id}`)
    .expect(200);

    expect(body).toEqual(todo);
  });

  test('Should return todo not found with i am to try deleted that todo', async () => {
    const {body} = await request(TestServer.app)
    .delete(`/api/todos/999`)
    .expect(404);
    expect(body).toEqual({ error: 'Todo with 999 not found' });
  });
});
