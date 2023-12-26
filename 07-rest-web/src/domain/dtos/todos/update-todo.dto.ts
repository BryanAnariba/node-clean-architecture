export class UpdateTodoDto {

  private constructor (
    public readonly id: number,
    public readonly todoName?: string, 
    public readonly completedAt?: Date
  ) {}

  get values () {
    const returnObj: {[key: string]: any} = {};
    if (this.todoName) returnObj.todoName = this.todoName;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return  returnObj;
  }

  static create(props: {[key: string]: any}): [string?, UpdateTodoDto?] {
    const { id, todoName, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id)) ) {
      return ['Todo Id is required', undefined];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['Completed At must be a valid date', undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, todoName, completedAt)];
  }
}