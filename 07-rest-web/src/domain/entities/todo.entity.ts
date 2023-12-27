export class TodoEntity {

  constructor (
    public id: number,
    public todoName: string,
    public completedAt?: Date | null,
  ) {}

  get isCompleted() {
    return !! this.completedAt;
  }

  public static fromJSON (object: {[key: string]: any}): TodoEntity {
    const { id, todoName, completedAt } = object;

    if (!id) throw new Error(`Id is required`);
    if (!todoName ) throw new Error(`Todo Name is required`);

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error('Completed At is not a valid date');
      }
    }

    return new TodoEntity(id, todoName, completedAt);
  }
}