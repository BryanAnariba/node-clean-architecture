export class CreateTodoDto {
  private constructor (
    public readonly todoName: string,
    public readonly completedAt?: Date
  ) {}

  static create (props: {[key: string]: any}): [string?, CreateTodoDto?] {
    const {todoName, completedAt} = props;
    let newCompletedAt = completedAt;

    if (!todoName || todoName.length === 0) return ['Todo Name is required', undefined];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['Completed At must be a valid date', undefined];
      }
    }

    return [undefined, new CreateTodoDto(todoName, newCompletedAt)];
  }
}