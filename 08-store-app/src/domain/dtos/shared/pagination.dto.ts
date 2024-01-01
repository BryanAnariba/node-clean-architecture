export class PaginationDto {
  
  private constructor (
    public readonly page: number,
    public readonly limit: number,
  ) {}

  public static create(page: number = 1, limit: number = 10): [string?, PaginationDto?] {
    if (isNaN(page) || isNaN(limit)) {
      return ['Page & Limit Must be numbers', undefined];
    }

    if (page <= 0) {
      return ['Page must be greater than zero', undefined];
    }

    if (limit <= 0) {
      return ['Limit must be greater than zero', undefined];
    }

    return [undefined, new PaginationDto(page, limit)];
  }
}