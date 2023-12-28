import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
  execute(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor (
    private todoRepository: TodoRepository
  ) {}

  execute(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.updateById(updateTodoDto);
  }
}