import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({data: createTodoDto!});
    return TodoEntity.fromJSON(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    //const { skip = 0, limit = 5 } = req.query;
    const skip = 0;
    const limit = 5;

    const todos = await prisma.todo.findMany({
      skip: Number(skip),
      take: Number(limit),
      orderBy: {
        completedAt: 'desc'
      },
    });
    
    return todos.map(
      todo => TodoEntity.fromJSON(todo)
    );
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({where: {id: id}});
    if (!todo) throw new CustomError('Todo with ' + id + ' not found', 404)
    return TodoEntity.fromJSON(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);
    const updateTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id,
      },
      data: updateTodoDto.values
    });
    return TodoEntity.fromJSON(updateTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const todoDeleted = await prisma.todo.delete({where: {id: id}});
    return TodoEntity.fromJSON(todoDeleted);
  }

}