import { httpClientPlugin } from '../../src/plugins/http-client.plugin';

describe('plugins/http-client.plugin.ts Test', () => {
  test('httpClientPlugin() should return a object', async () => {
    const data = await httpClientPlugin.get('https://jsonplaceholder.typicode.com/todos/1');
    expect(data).toEqual({
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": expect.any(Boolean)
    });
  });

  test('httpClientPlugin() should have POST, PUT, DELETE Method', () => {
    // const url = 'https://jsonplaceholder.typicode.com/todos/1';
    // const body = {userId: 1, id: 1, title: "whatever", completed: true};

    expect(typeof httpClientPlugin.post).toBe('function');
    expect(typeof httpClientPlugin.put).toBe('function');
    expect(typeof httpClientPlugin.delete).toBe('function');
    expect(typeof httpClientPlugin.get).toBe('function');
  });
});

